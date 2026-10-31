import asyncio
import json
from datetime import datetime

from app.config import settings
from app.db import get_model_profile, update_task
from app.llm import build_llm_from_profile


task_queues: dict[str, asyncio.Queue] = {}


async def register_task_queue(task_id: str):
    task_queues.setdefault(task_id, asyncio.Queue())
    return task_queues[task_id]


async def emit(task_id: str, event: dict):
    q = task_queues.get(task_id)
    if q is not None:
        await q.put(event)


async def stop_task(task_id: str):
    await emit(task_id, {"type": "status", "status": "stopped"})


async def run_browser_task(task_id: str, task_payload: dict):
    try:
        await emit(task_id, {"type": "status", "status": "running"})
        profile = get_model_profile(task_payload["model_profile_id"])
        if not profile:
            raise ValueError("Model profile not found")

        llm = build_llm_from_profile(profile)
        skill_content = task_payload.get("skill_content") or ""

        use_vision = task_payload.get("use_vision", "auto")
        if isinstance(use_vision, str):
            if use_vision.lower() in ("true", "false"):
                use_vision = use_vision.lower() == "true"
        else:
            use_vision = bool(use_vision)

        from browser_use import Agent, Browser

        browser = Browser(headless=task_payload.get("headless", settings.browser_headless), cdp_url=task_payload.get("cdp_url"))
        prompt = task_payload["prompt"]
        if skill_content:
            prompt = f"{prompt}\n\nSYSTEM SKILLS:\n{skill_content}"

        agent = Agent(
            task=prompt,
            llm=llm,
            browser=browser,
            use_vision=use_vision,
            max_steps=int(task_payload.get("max_steps", 100)),
            max_failures=int(task_payload.get("max_failures", 5)),
            headless=task_payload.get("headless", settings.browser_headless),
            use_thinking=bool(task_payload.get("use_thinking", True)),
            flash_mode=bool(task_payload.get("flash_mode", False)),
            extend_system_message=task_payload.get("extend_system_message"),
            sensitive_data=task_payload.get("sensitive_data") or {},
            available_file_paths=task_payload.get("available_file_paths") or [],
        )

        await emit(task_id, {"type": "message", "text": "Starting Browser Use agent", "step": 0})
        history = await agent.run(max_steps=int(task_payload.get("max_steps", 100)))
        final = history[-1] if isinstance(history, list) and history else {"result": "Task completed"}

        await emit(task_id, {"type": "status", "status": "finished"})
        await emit(task_id, {"type": "final", "result": final})
        update_task(task_id, {
            "status": "finished",
            "result": json.dumps(final, default=str),
            "steps": int(task_payload.get("max_steps", 100)),
            "updated_at": datetime.utcnow().isoformat(),
        })

    except Exception as exc:
        await emit(task_id, {"type": "status", "status": "error"})
        await emit(task_id, {"type": "message", "text": str(exc), "error": True})
        update_task(task_id, {
            "status": "error",
            "last_error": str(exc),
            "updated_at": datetime.utcnow().isoformat(),
        })
