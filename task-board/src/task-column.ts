import { LitElement, css, html } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { Task } from "./types.ts";
import "./task-card.ts";
import { repeat } from "lit/directives/repeat.js";

@customElement("task-column")
export class TaskColumn extends LitElement {
  static styles = css`
    :host {
      display: block;
    }

    .column {
      background-color: gray;
      height: 100vh;
      width: 500px;
      text-align: center;
      font-size: 30px;
      padding: 10px;
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

  @property({ type: Array })
  tasks: Task[] = [];

  connectedCallback() {
    super.connectedCallback();

    this.addEventListener("drop", this._onDrop);
    this.addEventListener("dragover", this._onDragOver);
  }

  render() {
    return html`
      <div class="column">
        ${this.name}
        ${repeat(
          this.tasks,
          (task) => task.id,
          (task) => {
            return html`<task-card
              title=${task.title}
              description=${task.description}
              priority=${task.priority}
              id=${task.id}
            ></task-card>`;
          },
        )}
      </div>
    `;
  }

  _onDrop(event: DragEvent) {
    event.preventDefault();

    const transferData: DataTransfer | null = event.dataTransfer;

    if (transferData) {
      const taskId = transferData.getData("text/plain");

      const options = {
        detail: { id: taskId, columnName: this.name },
        bubbles: true,
        composed: true,
      };
      this.dispatchEvent(new CustomEvent("task-droped", options));
    }
  }

  _onDragOver(event: DragEvent) {
    event.preventDefault();
  }
}
