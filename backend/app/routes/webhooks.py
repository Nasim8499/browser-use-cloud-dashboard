import uuid

import httpx
from fastapi import APIRouter, HTTPException

from app.db import list_webhooks, save_webhook
from app.models import WebhookCreate

router = APIRouter(prefix="/webhooks", tags=["webhooks"])


@router.get("")
async def list_all_hooks():
    return {"items": list_webhooks()}


@router.post("")
async def create_hook(payload: WebhookCreate):
    hook = {
        "id": str(uuid.uuid4()),
        "url": payload.url,
        "event_type": payload.event_type,
        "enabled": payload.enabled,
    }
    save_webhook(hook)
    return hook


@router.post("/test")
async def test_hook(payload: WebhookCreate):
    try:
        async with httpx.AsyncClient() as client:
            response = await client.post(payload.url, json={"event": payload.event_type, "success": True})
            return {"ok": response.status_code < 400}
    except Exception as exc:
        raise HTTPException(status_code=400, detail=str(exc))
