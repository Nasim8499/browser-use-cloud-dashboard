from pathlib import Path

from app.config import settings

SKILLS_DIR = Path(settings.skills_path)
SKILLS_DIR.mkdir(parents=True, exist_ok=True)


def list_skill_files():
    return sorted(SKILLS_DIR.glob("*.md"))


def save_skill_from_content(name: str, content: str) -> str:
    slug = name.strip().lower().replace(" ", "-").replace("/", "-")
    skill_path = SKILLS_DIR / f"{slug}.md"
    skill_path.write_text(content, encoding="utf-8")
    return str(skill_path)


def load_skill_text(skill_id: str) -> str:
    path = SKILLS_DIR / f"{skill_id}.md"
    if path.exists():
        return path.read_text(encoding="utf-8")
    return ""
