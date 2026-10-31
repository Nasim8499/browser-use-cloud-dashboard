# Deployment guide for Vercel + Render

This project is designed to run with:
- Frontend: Vercel
- Backend: Render
- Browser automation runtime: browser-capable Docker container

## 1) Deploy the backend on Render

Use the repo root Dockerfile and the included `render.yaml` configuration.

### Required environment variables
Set these in the Render dashboard or through the service environment:

```bash
APP_NAME=browser-use-dashboard
API_PREFIX=/api/v1
DATABASE_PATH=/app/data/app.db
SKILLS_PATH=/app/skills
ENCRYPTION_KEY=generate-a-long-random-secret-key
BROWSER_HEADLESS=true
BROWSER_USE_API_KEY=your_browser_use_api_key
OPENAI_API_KEY=your_openai_key
ANTHROPIC_API_KEY=your_anthropic_key
GOOGLE_API_KEY=your_google_key
AZURE_OPENAI_API_KEY=your_azure_key
AWS_ACCESS_KEY_ID=your_aws_key
AWS_SECRET_ACCESS_KEY=your_aws_secret
BEDROCK_REGION=us-east-1
OLLAMA_BASE_URL=http://host.docker.internal:11434
NEXT_PUBLIC_API_BASE=https://your-render-app.onrender.com
```

### Render setup
- Import the GitHub repo
- Set the root directory to repository root
- Use the Dockerfile backend for the service
- Set the service to expose port 8000
- Ensure the container has Chromium/Playwright-compatible dependencies installed

## 2) Deploy the frontend on Vercel

Import this repo into Vercel and set the root directory to `frontend`.

### Environment variables
Set the production variable:

```bash
NEXT_PUBLIC_API_BASE=https://your-render-app.onrender.com
```

### Build settings
- Framework: Next.js
- Root directory: `frontend`
- Build command: `npm run build`
- Output directory: `.next`

## 3) Final app URL
After deployment:
- Frontend: `https://your-vercel-app.vercel.app`
- Backend API: `https://your-render-app.onrender.com`

## 4) Notes
- SQLite is fine for local dev and starter usage.
- For production scale or multi-user workloads, switch to Postgres.
- The browser automation backend must be run in a browser-capable container, which this repo already includes.
