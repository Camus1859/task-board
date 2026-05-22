import { customElement, state, property, query } from "lit/decorators.js";
import { LitElement, html, css } from "lit";
import "./task-column.ts";

@customElement("task-board")
export class TaskBoard extends LitElement {
  static styles = css`
    :host {
      display: block;
    }

    .column-container {
      display: flex;
      background-color: red;
      justify-content: space-between;
      width: 100%;
    }
  `;
  @property()
  name: string = "";

  @state()
  tasks: {
    title: string;
    description: string;
    priority: string;
    id: string;
    status: string;
  }[] = [
    {
      id: Math.random().toString(),
      title: "Fix login bug",
      description: "Users can't log in with email",
      priority: "high",
      status: "In Progress",
    },
    {
      id: Math.random().toString(),
      title: "Add dark mode",
      description: "Support dark theme toggle",
      priority: "medium",
      status: "To Do",
    },
    {
      id: Math.random().toString(),
      title: "Update footer",
      description: "Change copyright year",
      priority: "low",
      status: "Done",
    },
  ];

  @state()
  title: string = "";

  @state()
  description: string = "";

  @state()
  priority: string = "";

  @query("input", true) _input!: HTMLInputElement;

  render() {
    return html`
      <div class="form-container">
        Title:
        <input
          .value=${this.title}
          @input=${(e: Event) =>
            (this.title = (e.target as HTMLInputElement).value)}
        />
        Description:
        <input
          .value=${this.description}
          @input=${(e: Event) =>
            (this.description = (e.target as HTMLInputElement).value)}
        />
        Priority:
        <select
          .value=${this.priority}
          @change=${(e: Event) =>
            (this.priority = (e.target as HTMLSelectElement).value)}
        >
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
        <button @click=${this._addTask}>Add Task</button>
      </div>
      <div class="column-container">
        <task-column
          name="To Do"
          .tasks=${this.tasks.filter((task) => task.status === "To Do")}
        ></task-column>
        <task-column
          name="In Progress"
          .tasks=${this.tasks.filter((task) => task.status === "In Progress")}
        ></task-column>
        <task-column
          name="Done"
          .tasks=${this.tasks.filter((task) => task.status === "Done")}
        ></task-column>
      </div>
    `;
  }

  private _addTask() {
    this.tasks = [
      ...this.tasks,
      {
        id: Math.random().toString(),
        title: this.title,
        description: this.description,
        priority: this.priority,
        status: "To Do",
      },
    ];

    this.title = "";
    this.description = "";
    this.priority = "";
  }
}
