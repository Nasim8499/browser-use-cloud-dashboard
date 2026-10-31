import os
from pathlib import Path
from pydantic_settings import BaseSettings, SettingsConfigDict

BASE_DIR = Path(__file__).resolve().parent.parent

class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", extra="ignore")
    app_name: str = "browser-use-dashboard"
    api_prefix: str = "/api/v1"
    database_path: str = os.getenv("DATABASE_PATH", str(BASE_DIR / "data" / "app.db"))
    skills_path: str = os.getenv("SKILLS_PATH", str(BASE_DIR / "skills"))
    encryption_key: str = os.getenv("ENCRYPTION_KEY", "change-this-to-a-very-long-random-secret-key")
    browser_headless: bool = os.getenv("BROWSER_HEADLESS", "true").lower() == "true"
    browser_use_api_key: str | None = os.getenv("BROWSER_USE_API_KEY")
    next_public_api_base: str = os.getenv("NEXT_PUBLIC_API_BASE", "http://localhost:8000")

settings = Settings()
