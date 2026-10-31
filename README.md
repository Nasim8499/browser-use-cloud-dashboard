# Browser Use Cloud Dashboard

A self-hosted, white-theme Browser Use dashboard with a real browser automation backend.

## Features
- Real `browser-use` agent backend
- Next.js + TypeScript frontend
- white/light theme with iOS-style liquid glass accents
- model profile manager for many providers
- live task stream and status updates
- skill bundles using `SKILL.md`
- SQLite storage for tasks, profiles, skills, secrets, webhooks
- Docker and local deployment
- PWA shell setup

## Local setup

### Backend
```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate
pip install -U pip
pip install -r requirements.txt
uv pip install browser-use
uvx browser-use install
python -m app.main
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

Open: http://localhost:3000

## Docker

```bash
docker compose up --build
```

Open:
- http://localhost:3000
- http://localhost:8000/docs

## Environment
Copy `.env.example` to `.env` and fill the values for the providers you use.

## License
MIT
