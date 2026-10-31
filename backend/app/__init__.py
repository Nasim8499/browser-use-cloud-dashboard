from pathlib import Path

from app.config import settings

BASE_DIR = Path(__file__).resolve().parent.parent
SKILLS_DIR = Path(settings.skills_path)
SKILLS_DIR.mkdir(parents=True, exist_ok=True)

__all__ = ["main"]
