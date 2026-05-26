import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("task-card")
export class TaskCard extends LitElement {
  static styles = css`
    :host {
      display: block;
    }

    section {
      padding: 5px;
    }

    .title-section {
      font-size: 22px;
      font-weight: bold;
    }

    .title-description,
    .title-priority {
      font-size: 16px;
      font-weight: normal;
    }
    .priority-red {
      color: red;
    }
    .priority-yellow {
      color: yellow;
    }
    .priority-green {
      color: green;
    }

    .container {
      display: flex;
      justify-content: center;
    }

    .card-container {
      width: 350px;
      border: 1px solid black;
      padding: 20px;
      margin-bottom: 10px;
    }
  `;

  connectedCallback() {
    super.connectedCallback();

    this.setAttribute("draggable", "true");
    this.addEventListener("dragstart", this.onDragStart, { passive: false });
  }

  onDragStart(event: DragEvent) {
    const transferData: DataTransfer | null = event.dataTransfer;

    if (transferData) {
      transferData.effectAllowed = "move";

      transferData?.setData("text/plain", this.id);
    }
  }

  @property()
  title: string = "";

  @property()
  description: string = "";

  @property()
  priority: string = "";

  @property()
  id: string = "";

  render() {
    return html`
      <div class="container">
        <div class="card-container">
          <section class="title-section">Title: ${this.title}</section>
          <section class="title-description">
            Description: ${this.description}
          </section>
          <section
            class="priority-${this._priorityColor(
              this.priority,
            )} title-priority"
          >
            Priority: ${this.priority}
          </section>
          <button @click=${() => this._deleteTask(this.id)}>Delete Task</button>
          <button @click=${() => this._EditTask(this.id)}>Edit Task</button>
        </div>
      </div>
    `;
  }

  private _priorityColor = (priority: string): string => {
    let color: string = "";
    if (priority === "high") {
      color = "red";
    } else if (priority === "medium") {
      color = "yellow";
    } else if (priority === "low") {
      color = "green";
    }
    return color;
  };

  private _deleteTask = (id: string): void => {
    const options = {
      detail: { id },
      bubbles: true,
      composed: true,
    };

    this.dispatchEvent(new CustomEvent("task-deleted", options));
  };

  private _EditTask = (id: string): void => {
    const options = {
      detail: { id: id, showModal: true },
      bubbles: true,
      composed: true,
    };
    this.dispatchEvent(new CustomEvent("task-edited", options));
  };
}
