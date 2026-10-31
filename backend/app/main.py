from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

from app.config import settings
from app.db import init_db
from app.routes.health import router as health_router
from app.routes.models import router as models_router
from app.routes.skills import router as skills_router
from app.routes.tasks import router as tasks_router
from app.routes.webhooks import router as webhooks_router
from app.scheduler import start_scheduler

init_db()

app = FastAPI(title="Browser Use Cloud Dashboard API", version="0.1.0")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(health_router, prefix=settings.api_prefix)
app.include_router(models_router, prefix=settings.api_prefix)
app.include_router(tasks_router, prefix=settings.api_prefix)
app.include_router(skills_router, prefix=settings.api_prefix)
app.include_router(webhooks_router, prefix=settings.api_prefix)

start_scheduler()


@app.get("/")
async def root():
    return JSONResponse({"ok": True, "name": "browser-use-dashboard"})
