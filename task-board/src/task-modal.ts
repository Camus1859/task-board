import { LitElement, css, html } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { Task } from "./types.ts";

@customElement("task-modal")
export class TaskModal extends LitElement {
  static styles = css`
    .modal-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.5);
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .modal-content {
      background: white;
      padding: 20px;
      border-radius: 8px;
      max-width: 500px;
      width: 90%;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
      position: relative;
      display: flex;
      flex-direction: column;
    }

    .close-btn {
      position: absolute;
      right: 15px;
      top: 10px;
      font-size: 24px;
      cursor: pointer;
    }

    .description {
      height: 100px;
    }

    .priority {
      width: 100px;
    }

    .space {
      margin-bottom: 10px;
    }
  `;

  @property()
  showModal: boolean = false;

  @property()
  editingTask: Task | null = null;

  render() {
    if (this.showModal) {
      return html`<div class="modal-overlay">
        <div class="modal-content">
          <span @click=${this._closeModal} class="close-btn">&times;</span>
          Title:
          <input
            class="title"
            .value=${this.editingTask?.title}
            @input=${(e: Event) =>
              (this.editingTask = {
                ...this.editingTask!,
                title: (e.target as HTMLInputElement).value,
              })}
          />
          <div class="space"></div>

          Description:
          <input
            class="description"
            .value=${this.editingTask?.description}
            @input=${(e: Event) =>
              (this.editingTask = {
                ...this.editingTask!,
                description: (e.target as HTMLInputElement).value,
              })}
          />
          <div class="space"></div>

          Priority:
          <select
            class="priority"
            .value=${this.editingTask?.priority}
            @change=${(e: Event) =>
              (this.editingTask = {
                ...this.editingTask!,
                priority: (e.target as HTMLInputElement).value,
              })}
          >
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
          <div class="space"></div>

          Status:
          <select
            class="status"
            .value=${this.editingTask?.status}
            @change=${(e: Event) =>
              (this.editingTask = {
                ...this.editingTask!,
                status: (e.target as HTMLInputElement).value,
              })}
          >
            <option value="To Do">To Do</option>
            <option value="In Progress">In Progress</option>
            <option value="Done">Done</option>
          </select>
          <div class="space"></div>

          <button @click=${this._updateTask}>Save</button>
        </div>
      </div> `;
    } else {
      return null;
    }
  }

  private _closeModal() {
    const options = {
      detail: { showModal: false },
      bubbles: true,
      composed: true,
    };
    this.dispatchEvent(new CustomEvent("show-modal", options));
  }

  private _updateTask() {
    const options = {
      detail: { editedTask: this.editingTask, showModal: false },
      bubbles: true,
      composed: true,
    };

    this.dispatchEvent(new CustomEvent("update-task", options));
  }
}
