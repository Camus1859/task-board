import { LitElement, css, html } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import "./task-card.ts";
import { repeat } from "lit/directives/repeat.js"

@customElement("task-column")
export class TaskColumn extends LitElement {
  static styles = css`
    :host {
      display: block;
    }

    .column {
      background-color: gray;
      height: 100vh;
      max-width: 500px;
    }

    .card-title {
      display: flex;
      width: 100%;
      justify-content: center;
      padding-top: 10px;
      font-size: 30px;
      text-transform: uppercase;
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
  }[] = [
    {
      id: Math.random().toString(),
      title: "Fix login bug",
      description: "Users can't log in with email",
      priority: "high",
    },
    {
      id: Math.random().toString(),
      title: "Add dark mode",
      description: "Support dark theme toggle",
      priority: "medium",
    },
    {
      id: Math.random().toString(),
      title: "Update footer",
      description: "Change copyright year",
      priority: "low",
    },
  ];

  render() {
    return html`
      <div class="column">
      <slot name="header"></slot>
        ${repeat(
          this.tasks,
          (task) => task.id,
          (task) =>
            html`<task-card
              title=${task.title}
              description=${task.description}
              priority=${task.priority}
            ></task-card>`,
        )}
      </div>
    `;
  }
}
