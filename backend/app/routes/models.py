from fastapi import APIRouter, HTTPException

from app.db import delete_model_profile, get_model_profile, list_model_profiles, upsert_model_profile
from app.models import ModelProfileCreate

router = APIRouter(prefix="/models", tags=["models"])


@router.get("")
async def list_profiles():
    return {"items": list_model_profiles()}


@router.post("")
async def create_profile(payload: ModelProfileCreate):
    return upsert_model_profile(None, payload.model_dump())


@router.get("/{profile_id}")
async def get_profile(profile_id: int):
    item = get_model_profile(profile_id)
    if not item:
        raise HTTPException(status_code=404, detail="Profile not found")
    return item


@router.put("/{profile_id}")
async def update_profile(profile_id: int, payload: ModelProfileCreate):
    existing = get_model_profile(profile_id)
    if not existing:
        raise HTTPException(status_code=404, detail="Profile not found")
    return upsert_model_profile(profile_id, payload.model_dump())


@router.delete("/{profile_id}")
async def delete_profile(profile_id: int):
    delete_model_profile(profile_id)
    return {"deleted": True}
