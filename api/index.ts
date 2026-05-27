import express, { Request, Response, NextFunction } from "express";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

let tasks = [
  {
    id: "1",
    title: "Fix login bug",
    description: "Users can't log in with email",
    priority: "high",
    status: "In Progress",
  },
  {
    id: "2",
    title: "Add dark mode",
    description: "Support dark theme toggle",
    priority: "medium",
    status: "To Do",
  },
  {
    id: "3",
    title: "Update footer",
    description: "Change copyright year",
    priority: "low",
    status: "Done",
  },
  {
    id: "4",
    title: "Set up CI/CD pipeline",
    description: "Automate testing and deployment with GitHub Actions",
    priority: "high",
    status: "To Do",
  },
  {
    id: "5",
    title: "Refactor user service",
    description: "Break monolithic user module into smaller functions",
    priority: "medium",
    status: "In Progress",
  },
  {
    id: "6",
    title: "Write API documentation",
    description: "Document all REST endpoints with examples",
    priority: "low",
    status: "To Do",
  },
  {
    id: "7",
    title: "Fix memory leak in dashboard",
    description: "Dashboard crashes after 30 minutes of use",
    priority: "high",
    status: "In Progress",
  },
  {
    id: "10",
    title: "Remove deprecated endpoints",
    description: "Clean up v1 API routes no longer in use",
    priority: "low",
    status: "Done",
  },
  {
    id: "11",
    title: "Add unit tests for auth module",
    description: "Coverage is at 20%, needs to be above 80%",
    priority: "medium",
    status: "In Progress",
  },
  {
    id: "12",
    title: "Migrate to TypeScript",
    description: "Convert remaining JS files to TypeScript",
    priority: "low",
    status: "In Progress",
  },
  {
    id: "13",
    title: "Fix broken notification emails",
    description: "Users not receiving signup confirmation emails",
    priority: "high",
    status: "Done",
  },
];

app.get("/api/tasks", (req: Request, res: Response, next: NextFunction) => {
  try {
    res.json(tasks);
  } catch (e) {
    next(e);
  }
});

app.post("/api/tasks", (req: Request, res: Response, next: NextFunction) => {
  try {
    const { title, description, priority, status } = req.body;
    const newTask = {
      id: Math.random().toString(36).substring(2),
      title,
      description,
      priority,
      status,
    };
    tasks.push(newTask);
    res.status(201).json(tasks);
  } catch (e) {
    next(e);
  }
});

app.put("/api/tasks/:id", (req: Request, res: Response, next: NextFunction) => {
  try {
    const task = tasks.find((t) => t.id === req.params.id);
    if (!task) return res.status(404).json({ error: "Task not found" });
    tasks = tasks.map((t) =>
      t.id === req.params.id ? { ...t, ...req.body } : t
    );
    res.json(tasks);
  } catch (e) {
    next(e);
  }
});

app.delete("/api/tasks/:id", (req: Request, res: Response, next: NextFunction) => {
  try {
    const task = tasks.find((t) => t.id === req.params.id);
    if (!task) return res.status(404).json({ error: "Task not found" });
    tasks = tasks.filter((t) => t.id !== req.params.id);
    res.json(tasks);
  } catch (e) {
    next(e);
  }
});

app.listen(PORT, () => {
  console.log(`API running on http://localhost:${PORT}`);
});
