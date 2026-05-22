import { customElement, state, property } from "lit/decorators.js";
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

  render() {
    return html`
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
}
