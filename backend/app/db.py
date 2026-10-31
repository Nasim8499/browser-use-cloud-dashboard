import json
import sqlite3
from pathlib import Path
from typing import Optional

from app.config import settings

DB_PATH = Path(settings.database_path)
DB_PATH.parent.mkdir(parents=True, exist_ok=True)


def get_connection() -> sqlite3.Connection:
    conn = sqlite3.connect(str(DB_PATH))
    conn.row_factory = sqlite3.Row
    return conn


def init_db() -> None:
    conn = get_connection()
    conn.executescript(
        """
        CREATE TABLE IF NOT EXISTS model_profiles (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            provider TEXT NOT NULL,
            model TEXT NOT NULL,
            api_key TEXT,
            base_url TEXT,
            temperature REAL NOT NULL DEFAULT 0.2,
            extra_json TEXT DEFAULT '{}',
            is_default INTEGER NOT NULL DEFAULT 0,
            created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
        );

        CREATE TABLE IF NOT EXISTS tasks (
            id TEXT PRIMARY KEY,
            prompt TEXT NOT NULL,
            model_profile_id INTEGER,
            status TEXT NOT NULL DEFAULT 'queued',
            result TEXT,
            steps INTEGER NOT NULL DEFAULT 0,
            duration_ms INTEGER DEFAULT 0,
            created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
            updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
            last_error TEXT,
            browser_session TEXT,
            metadata TEXT DEFAULT '{}',
            follow_up_prompt TEXT
        );

        CREATE TABLE IF NOT EXISTS skills (
            id TEXT PRIMARY KEY,
            name TEXT NOT NULL,
            content TEXT NOT NULL,
            enabled INTEGER NOT NULL DEFAULT 1,
            created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
        );

        CREATE TABLE IF NOT EXISTS secrets (
            id TEXT PRIMARY KEY,
            name TEXT NOT NULL,
            value TEXT NOT NULL,
            created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
        );

        CREATE TABLE IF NOT EXISTS webhooks (
            id TEXT PRIMARY KEY,
            url TEXT NOT NULL,
            event_type TEXT NOT NULL,
            enabled INTEGER NOT NULL DEFAULT 1,
            created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
        );

        CREATE TABLE IF NOT EXISTS usage_metrics (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            model_profile_id INTEGER,
            task_id TEXT,
            steps INTEGER DEFAULT 0,
            input_tokens INTEGER DEFAULT 0,
            output_tokens INTEGER DEFAULT 0,
            created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
        );
        """
    )
    conn.commit()
    conn.close()


def mask_secret(value: Optional[str]) -> Optional[str]:
    if not value:
        return None
    if len(value) <= 8:
        return "*" * len(value)
    return value[:2] + "*" * (len(value) - 4) + value[-2:]


def list_model_profiles() -> list[dict]:
    conn = get_connection()
    rows = conn.execute("SELECT * FROM model_profiles ORDER BY created_at DESC").fetchall()
    conn.close()
    out = []
    for row in rows:
        profile = dict(row)
        profile["extra_json"] = json.loads(profile.get("extra_json") or "{}")
        profile["api_key"] = mask_secret(profile.get("api_key"))
        out.append(profile)
    return out


def get_model_profile(profile_id: int) -> Optional[dict]:
    conn = get_connection()
    row = conn.execute("SELECT * FROM model_profiles WHERE id = ?", (profile_id,)).fetchone()
    conn.close()
    if not row:
        return None
    profile = dict(row)
    profile["extra_json"] = json.loads(profile.get("extra_json") or "{}")
    profile["api_key"] = mask_secret(profile.get("api_key"))
    return profile


def upsert_model_profile(profile_id: Optional[int], profile: dict) -> dict:
    conn = get_connection()
    if profile_id is None:
        cur = conn.cursor()
        cur.execute(
            """
            INSERT INTO model_profiles (name, provider, model, api_key, base_url, temperature, extra_json, is_default)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
            """,
            (
                profile["name"],
                profile["provider"],
                profile["model"],
                profile.get("api_key"),
                profile.get("base_url"),
                float(profile.get("temperature", 0.2)),
                json.dumps(profile.get("extra_json", {})),
                int(bool(profile.get("is_default", False))),
            ),
        )
        conn.commit()
        inserted_id = cur.lastrowid
        conn.close()
        return {"id": inserted_id, **profile}

    conn.execute(
        """
        UPDATE model_profiles
        SET name = ?, provider = ?, model = ?, api_key = ?, base_url = ?, temperature = ?, extra_json = ?, is_default = ?
        WHERE id = ?
        """,
        (
            profile["name"],
            profile["provider"],
            profile["model"],
            profile.get("api_key"),
            profile.get("base_url"),
            float(profile.get("temperature", 0.2)),
            json.dumps(profile.get("extra_json", {})),
            int(bool(profile.get("is_default", False))),
            profile_id,
        ),
    )
    conn.commit()
    conn.close()
    return {"id": profile_id, **profile}


def delete_model_profile(profile_id: int) -> None:
    conn = get_connection()
    conn.execute("DELETE FROM model_profiles WHERE id = ?", (profile_id,))
    conn.commit()
    conn.close()


def add_task(task: dict) -> None:
    conn = get_connection()
    conn.execute(
        """
        INSERT INTO tasks (id, prompt, model_profile_id, status, result, steps, duration_ms, created_at, updated_at, last_error, browser_session, metadata, follow_up_prompt)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        """,
        (
            task["id"],
            task["prompt"],
            task.get("model_profile_id"),
            task.get("status", "queued"),
            task.get("result"),
            task.get("steps", 0),
            task.get("duration_ms", 0),
            task.get("created_at"),
            task.get("updated_at"),
            task.get("last_error"),
            task.get("browser_session"),
            json.dumps(task.get("metadata", {})),
            task.get("follow_up_prompt"),
        ),
    )
    conn.commit()
    conn.close()


def get_task(task_id: str) -> Optional[dict]:
    conn = get_connection()
    row = conn.execute("SELECT * FROM tasks WHERE id = ?", (task_id,)).fetchone()
    conn.close()
    if not row:
        return None
    task = dict(row)
    task["metadata"] = json.loads(task.get("metadata") or "{}")
    return task


def list_tasks() -> list[dict]:
    conn = get_connection()
    rows = conn.execute("SELECT * FROM tasks ORDER BY created_at DESC").fetchall()
    conn.close()
    out = []
    for row in rows:
        task = dict(row)
        task["metadata"] = json.loads(task.get("metadata") or "{}")
        out.append(task)
    return out


def update_task(task_id: str, updates: dict) -> None:
    conn = get_connection()
    fields = []
    values = []
    for key, value in updates.items():
        if key == "metadata":
            value = json.dumps(value)
        fields.append(f"{key} = ?")
        values.append(value)
    if not fields:
        conn.close()
        return
    values.append(task_id)
    conn.execute(f"UPDATE tasks SET {', '.join(fields)} WHERE id = ?", tuple(values))
    conn.commit()
    conn.close()


def add_skill(skill: dict) -> None:
    conn = get_connection()
    conn.execute(
        """
        INSERT INTO skills (id, name, content, enabled, created_at)
        VALUES (?, ?, ?, ?, ?)
        """,
        (skill["id"], skill["name"], skill["content"], int(bool(skill.get("enabled", True))), skill.get("created_at")),
    )
    conn.commit()
    conn.close()


def list_skills() -> list[dict]:
    conn = get_connection()
    rows = conn.execute("SELECT * FROM skills ORDER BY created_at DESC").fetchall()
    conn.close()
    return [dict(row) for row in rows]


def delete_skill(skill_id: str) -> None:
    conn = get_connection()
    conn.execute("DELETE FROM skills WHERE id = ?", (skill_id,))
    conn.commit()
    conn.close()


def save_secret(name: str, value: str) -> None:
    conn = get_connection()
    conn.execute(
        "INSERT OR REPLACE INTO secrets (id, name, value, created_at) VALUES (?, ?, ?, CURRENT_TIMESTAMP)",
        (name, name, value),
    )
    conn.commit()
    conn.close()


def list_secrets() -> list[dict]:
    conn = get_connection()
    rows = conn.execute("SELECT * FROM secrets ORDER BY created_at DESC").fetchall()
    conn.close()
    return [dict(row) for row in rows]


def save_webhook(webhook: dict) -> None:
    conn = get_connection()
    conn.execute(
        """
        INSERT OR REPLACE INTO webhooks (id, url, event_type, enabled, created_at)
        VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP)
        """,
        (webhook["id"], webhook["url"], webhook["event_type"], int(bool(webhook.get("enabled", True)))),
    )
    conn.commit()
    conn.close()


def list_webhooks() -> list[dict]:
    conn = get_connection()
    rows = conn.execute("SELECT * FROM webhooks ORDER BY created_at DESC").fetchall()
    conn.close()
    return [dict(row) for row in rows]
