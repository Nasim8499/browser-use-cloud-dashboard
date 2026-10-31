import os
from typing import Any

from browser_use import (
    ChatAnthropic,
    ChatAnthropicBedrock,
    ChatAWSBedrock,
    ChatAzureOpenAI,
    ChatBrowserUse,
    ChatCerebras,
    ChatDeepSeek,
    ChatGoogle,
    ChatGroq,
    ChatLiteLLM,
    ChatMistral,
    ChatOllama,
    ChatOpenAI,
    ChatOpenRouter,
    ChatVercel,
)


def build_llm_from_profile(profile: dict[str, Any]):
    provider = (profile.get("provider") or "").upper()
    model = profile.get("model") or "gpt-4o-mini"
    api_key = profile.get("api_key")
    base_url = profile.get("base_url")
    temperature = float(profile.get("temperature") or 0.2)
    extra = profile.get("extra_json") or {}

    if provider in ("BROWSER_USE", "BROWSERUSE"):
        return ChatBrowserUse(api_key=api_key or os.getenv("BROWSER_USE_API_KEY"), model=model)

    if provider == "OPENAI":
        return ChatOpenAI(model=model, api_key=api_key or os.getenv("OPENAI_API_KEY"), base_url=base_url, temperature=temperature, **extra)

    if provider == "CUSTOM_OPENAI":
        return ChatOpenAI(model=model, api_key=api_key or os.getenv("OPENAI_API_KEY"), base_url=base_url, temperature=temperature, **extra)

    if provider == "ANTHROPIC":
        return ChatAnthropic(model=model, api_key=api_key or os.getenv("ANTHROPIC_API_KEY"), temperature=temperature, **extra)

    if provider == "GOOGLE":
        return ChatGoogle(model=model, api_key=api_key or os.getenv("GOOGLE_API_KEY"), temperature=temperature, **extra)

    if provider == "AZURE_OPENAI":
        return ChatAzureOpenAI(model=model, api_key=api_key or os.getenv("AZURE_OPENAI_API_KEY"), azure_endpoint=base_url, temperature=temperature, **extra)

    if provider in ("BEDROCK", "AWS_BEDROCK"):
        return ChatAWSBedrock(
            model=model,
            aws_access_key_id=os.getenv("AWS_ACCESS_KEY_ID"),
            aws_secret_access_key=os.getenv("AWS_SECRET_ACCESS_KEY"),
            region_name=os.getenv("BEDROCK_REGION", "us-east-1"),
            temperature=temperature,
            **extra,
        )

    if provider == "ANTHROPIC_BEDROCK":
        return ChatAnthropicBedrock(
            model=model,
            aws_access_key_id=os.getenv("AWS_ACCESS_KEY_ID"),
            aws_secret_access_key=os.getenv("AWS_SECRET_ACCESS_KEY"),
            region_name=os.getenv("BEDROCK_REGION", "us-east-1"),
            temperature=temperature,
            **extra,
        )

    if provider == "GROQ":
        return ChatGroq(model=model, api_key=api_key or os.getenv("GROQ_API_KEY"), temperature=temperature, **extra)

    if provider == "OLLAMA":
        return ChatOllama(model=model, base_url=base_url or os.getenv("OLLAMA_BASE_URL", "http://localhost:11434"), temperature=temperature, **extra)

    if provider == "DEEPSEEK":
        return ChatDeepSeek(model=model, api_key=api_key or os.getenv("DEEPSEEK_API_KEY"), temperature=temperature, **extra)

    if provider == "MISTRAL":
        return ChatMistral(model=model, api_key=api_key or os.getenv("MISTRAL_API_KEY"), temperature=temperature, **extra)

    if provider == "CEREBRAS":
        return ChatCerebras(model=model, api_key=api_key or os.getenv("CEREBRAS_API_KEY"), temperature=temperature, **extra)

    if provider == "OPENROUTER":
        return ChatOpenRouter(model=model, api_key=api_key or os.getenv("OPENROUTER_API_KEY"), base_url=base_url, temperature=temperature, **extra)

    if provider == "VERCEL":
        return ChatVercel(model=model, api_key=api_key or os.getenv("VERCEL_API_KEY"), temperature=temperature, **extra)

    if provider == "LITELLM":
        return ChatLiteLLM(model=model, api_key=api_key or os.getenv("OPENAI_API_KEY"), base_url=base_url, temperature=temperature, **extra)

    return ChatOpenAI(model=model, api_key=api_key or os.getenv("OPENAI_API_KEY"), base_url=base_url, temperature=temperature, **extra)
