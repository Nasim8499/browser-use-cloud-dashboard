import uuid
from datetime import datetime

from fastapi import APIRouter

from app.db import add_skill, delete_skill, list_skills
from app.models import SkillCreate
from app.skill_store import save_skill_from_content

router = APIRouter(prefix="/skills", tags=["skills"])


@router.get("")
async def list_all_skills():
    return {"items": list_skills()}


@router.post("")
async def create_skill(payload: SkillCreate):
    skill_id = str(uuid.uuid4())
    file_path = save_skill_from_content(payload.name, payload.content)
    add_skill({
        "id": skill_id,
        "name": payload.name,
        "content": payload.content,
        "enabled": payload.enabled,
        "created_at": datetime.utcnow().isoformat(),
    })
    return {"id": skill_id, "name": payload.name, "path": file_path, "enabled": payload.enabled}


@router.delete("/{skill_id}")
async def delete_skill_by_id(skill_id: str):
    delete_skill(skill_id)
    return {"deleted": True}
