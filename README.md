# Task Board

A simplified Trello-style task board built with Lit web components, backed by an Express API, containerized with Docker.

## Features

- Create, edit, and delete tasks
- Drag and drop tasks between columns (To Do, In Progress, Done)
- Priority levels with color coding (low, medium, high)
- Sort and filter tasks
- Modal-based task editing

## Tech Stack

- **Frontend:** Lit, TypeScript, Vite
- **Backend:** Node.js, Express, TypeScript
- **Containerization:** Docker, Docker Compose
- **Frontend image:** Multi-stage build (Node + nginx)
- **Backend image:** Node 22 + tsx
- **Registry:** Docker Hub (`alaventure/task-board-frontend`, `alaventure/task-board-api`)

## Project Structure

- `task-board/` — Lit frontend app
- `api/` — Express REST API
- `docker-compose.yml` — Runs both services together
- `data/` — Bind mount volume for task persistence

## Getting Started

### Run with Docker Compose 

```bash
docker compose up
```

Frontend: `http://localhost:8080`
API: `http://localhost:3001`

### Other Compose commands

```bash
docker compose down         
docker compose up --build   
docker compose logs          
```

### Run locally (without Docker)

```bash
# Start the API
cd api && npm install && npx tsx index.ts

# Start the frontend (in a separate terminal)
cd task-board && npm install && npm run dev
```

## Upcoming

- [ ] Kubernetes deployment
- [ ] Helm chart
- [ ] CI/CD with ArgoCD
- [ ] Python microservice (priority scoring / workload analysis)
