import asyncio
import json
import uuid
from datetime import datetime

from fastapi import APIRouter, HTTPException
from fastapi.responses import StreamingResponse

from app.browser_agent import emit, register_task_queue, run_browser_task
from app.db import add_task, get_task, list_tasks, update_task
from app.models import TaskCreate
from app.skill_store import load_skill_text

router = APIRouter(prefix="/tasks", tags=["tasks"])


@router.get("")
async def list_task_runs():
    return {"items": list_tasks()}


@router.post("")
async def create_task(payload: TaskCreate):
    task_id = str(uuid.uuid4())
    skill_content = ""
    for skill_id in payload.skill_ids:
        skill_content += "\n\n" + load_skill_text(skill_id)

    task = {
        "id": task_id,
        "prompt": payload.prompt,
        "model_profile_id": payload.model_profile_id,
        "status": "queued",
        "result": None,
        "steps": 0,
        "duration_ms": 0,
        "created_at": datetime.utcnow().isoformat(),
        "updated_at": datetime.utcnow().isoformat(),
        "last_error": None,
        "browser_session": payload.browser_session,
        "metadata": {
            "skill_ids": payload.skill_ids,
            "max_steps": payload.max_steps,
            "use_vision": payload.use_vision,
            "flash_mode": payload.flash_mode,
            "use_thinking": payload.use_thinking,
            "max_failures": payload.max_failures,
            "extend_system_message": payload.extend_system_message,
            "sensitive_data": payload.sensitive_data,
            "available_file_paths": payload.available_file_paths,
            "headless": payload.headless,
            "cdp_url": payload.cdp_url,
        },
        "follow_up_prompt": None,
    }
    add_task(task)
    await register_task_queue(task_id)
    asyncio.create_task(
        run_browser_task(
            task_id,
            {
                "prompt": payload.prompt,
                "model_profile_id": payload.model_profile_id,
                "skill_content": skill_content,
                "max_steps": payload.max_steps,
                "use_vision": payload.use_vision,
                "flash_mode": payload.flash_mode,
                "use_thinking": payload.use_thinking,
                "max_failures": payload.max_failures,
                "extend_system_message": payload.extend_system_message,
                "sensitive_data": payload.sensitive_data,
                "available_file_paths": payload.available_file_paths,
                "headless": payload.headless,
                "cdp_url": payload.cdp_url,
            },
        )
    )
    return task


@router.get("/{task_id}")
async def get_task_details(task_id: str):
    item = get_task(task_id)
    if not item:
        raise HTTPException(status_code=404, detail="Task not found")
    return item


@router.post("/{task_id}/stop")
async def stop_task(task_id: str):
    update_task(task_id, {"status": "stopped"})
    await emit(task_id, {"type": "status", "status": "stopped"})
    return {"stopped": True}


@router.post("/{task_id}/follow-up")
async def follow_up(task_id: str, payload: dict):
    task = get_task(task_id)
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    message = payload.get("prompt", "")
    update_task(task_id, {"follow_up_prompt": message, "status": "running"})
    await emit(task_id, {"type": "message", "text": f"Follow-up: {message}"})
    return {"ok": True}


@router.get("/{task_id}/events")
async def task_events(task_id: str):
    async def event_generator():
        queue = await register_task_queue(task_id)
        while True:
            event = await queue.get()
            yield f"data: {json.dumps(event)}\n\n"

    return StreamingResponse(event_generator(), media_type="text/event-stream")
