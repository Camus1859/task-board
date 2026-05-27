# Task Board

A simplified Trello-style task board built with Lit web components, backed by an Express API.

## Features

- Create, edit, and delete tasks
- Drag and drop tasks between columns (To Do, In Progress, Done)
- Priority levels with color coding (low, medium, high)
- Sort and filter tasks
- Modal-based task editing

## Tech Stack

- **Frontend:** Lit, TypeScript, Vite
- **Backend:** Node.js, Express
- **Containerization:** Docker (multi-stage build with nginx)

## Project Structure

- `task-board/` — Lit frontend app
- `api/` — Express REST API

## Getting Started

### Run locally

```bash
# Start the API
cd api && npm install && node index.js

# Start the frontend (in a separate terminal)
cd task-board && npm install && npm run dev
```

### Run with Docker

```bash
# Build the frontend image
cd task-board && docker build -t task-board .

# Run the container
docker run -p 8080:80 task-board
```

Visit `http://localhost:8080` to view the app.

## Upcoming

- [ ] Dockerize the Express API
- [ ] Docker Compose (run frontend + backend together)
- [ ] Kubernetes deployment
- [ ] Helm chart
- [ ] CI/CD with ArgoCD
- [ ] Python microservice (priority scoring / workload analysis)
