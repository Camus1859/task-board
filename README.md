# Task Board

A simplified Trello-style task board built with Lit web components, backed by an Express API, containerized with Docker, orchestrated with Kubernetes and Helm.

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
- **Orchestration:** Kubernetes (Minikube)
- **Frontend image:** Multi-stage build (Node + nginx)
- **Backend image:** Node 22 + tsx
- **Registry:** Docker Hub (`alaventure/task-board-frontend`, `alaventure/task-board-api`)

## Project Structure

- `task-board/` — Lit frontend app
- `api/` — Express REST API
- `docker-compose.yml` — Runs both services together
- `data/` — Bind mount volume for task persistence
- `k8s/` — Kubernetes manifests (Deployments, Services, PVC)
- `helm/task-board-chart/` — Helm chart for templated K8s deployments

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

### Run with Kubernetes (Minikube)

```bash
# Create namespace
kubectl create namespace task-board

# Apply manifests
kubectl apply -f k8s/pvc.yaml --namespace=task-board
kubectl apply -f k8s/deployments.yaml --namespace=task-board
kubectl apply -f k8s/service.yaml --namespace=task-board

# Open in browser (macOS)
minikube service task-board-frontend-service --namespace=task-board
```

### Run locally (without Docker)

```bash
# Start the API
cd api && npm install && npx tsx index.ts

# Start the frontend (in a separate terminal)
cd task-board && npm install && npm run dev
```

## Upcoming

- [ ] Debugging Boot Camp (Phase 5 — in progress)
- [ ] Rebuild from scratch (Phase 5)
- [ ] Replace JSON file with Postgres (Phase 6)
- [ ] Add tests — unit, integration, e2e (Phase 7)
- [ ] CI/CD pipeline with GitHub Actions (Phase 8)
- [ ] GitOps with ArgoCD (Phase 9 — optional)
- [ ] Python microservice (Phase 10 — optional)
