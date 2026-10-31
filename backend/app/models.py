from __future__ import annotations

from typing import Any, Literal, Optional

from pydantic import BaseModel, Field

ModelProvider = Literal[
    "BROWSER_USE",
    "OPENAI",
    "ANTHROPIC",
    "GOOGLE",
    "AZURE_OPENAI",
    "BEDROCK",
    "ANTHROPIC_BEDROCK",
    "GROQ",
    "OLLAMA",
    "DEEPSEEK",
    "MISTRAL",
    "CEREBRAS",
    "OPENROUTER",
    "VERCEL",
    "LITELLM",
    "CUSTOM_OPENAI",
]


class ModelProfileCreate(BaseModel):
    name: str
    provider: ModelProvider
    model: str
    api_key: Optional[str] = None
    base_url: Optional[str] = None
    temperature: float = 0.2
    extra_json: dict[str, Any] = Field(default_factory=dict)
    is_default: bool = False


class TaskCreate(BaseModel):
    prompt: str
    model_profile_id: Optional[int] = None
    skill_ids: list[str] = Field(default_factory=list)
    max_steps: int = 100
    use_vision: Literal["auto", "true", "false"] = "auto"
    flash_mode: bool = False
    use_thinking: bool = True
    max_failures: int = 5
    extend_system_message: Optional[str] = None
    sensitive_data: dict[str, str] = Field(default_factory=dict)
    available_file_paths: list[str] = Field(default_factory=list)
    headless: bool = True
    cdp_url: Optional[str] = None
    browser_session: Optional[str] = None


class SkillCreate(BaseModel):
    name: str
    content: str
    enabled: bool = True


class WebhookCreate(BaseModel):
    url: str
    event_type: str = "task.finished"
    enabled: bool = True
