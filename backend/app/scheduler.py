from apscheduler.schedulers.asyncio import AsyncIOScheduler

scheduler = AsyncIOScheduler()


def start_scheduler():
    if not scheduler.running:
        scheduler.start()


def schedule_task(job_id: str, run_at: str, func, **kwargs):
    scheduler.add_job(func, "date", run_date=run_at, id=job_id, kwargs=kwargs)
