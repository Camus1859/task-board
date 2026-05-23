import { LitElement, css, html } from "lit";
import { customElement, state } from "lit/decorators.js";

@customElement("task-form")
export class TaskForm extends LitElement {
  static styles = css`
    .form-container {
      display: flex;
      flex-direction: column;
      max-width: 300px;
    }

    .task-button {
      width: 90px;
      padding: 10px;
    }

    .description {
      height: 100px;
    }

    .priority {
      width: 100px;
    }

    .space {
      margin-bottom: var(--modal-space, 12px);
    }

    .error {
      color: red;
    }
  `;

  @state()
  title: string = "";

  @state()
  description: string = "";

  @state()
  priority: string = "";

  @state()
  error: { title: string; description: string; priority: string } = {
    title: "",
    description: "",
    priority: "",
  };

  render() {
    return html` <div class="form-container">
      Title:
      <input
        class="title"
        .value=${this.title}
        i
        d
        @input=${(e: Event) => {
          this.title = (e.target as HTMLInputElement).value;
          if (this.error.title) this.error = { ...this.error, title: "" };
        }}
      />
      ${this.error.title ? html`<p class="error">${this.error.title}</p>` : ""}
      <div class="space"></div>
      Description:
      <input
        class="description"
        .value=${this.description}
        @input=${(e: Event) => {
          this.description = (e.target as HTMLInputElement).value;
          if (this.error.description)
            this.error = { ...this.error, description: "" };
        }}
      />
      ${this.error.description
        ? html`<p class="error">${this.error.description}</p>`
        : ""}
      <div class="space"></div>

      Priority:
      <select
        class="priority"
        .value=${this.priority}
        @change=${(e: Event) => {
          this.priority = (e.target as HTMLSelectElement).value;
          if (this.error.priority) this.error = { ...this.error, priority: "" };
        }}
      >
        <option value="high">High</option>
        <option value="medium">Medium</option>
        <option value="low">Low</option>
      </select>
      ${this.error.priority
        ? html`<p class="error">${this.error.priority}</p>`
        : ""}
      <div class="space"></div>

      <button class="task-button" @click=${this._addTask}>Add Task</button>
    </div>`;
  }

  private _validation() {
    this.error = { title: "", description: "", priority: "" };
    let hasError = false;
    if (this.title.trim() === "") {
      this.error = { ...this.error, title: "Title is missing" };
      hasError = true;
    }
    if (this.description.trim() === "") {
      this.error = { ...this.error, description: "Description is missing" };
      hasError = true;
    }
    if (this.priority.trim() === "") {
      this.error = { ...this.error, priority: "Priority is missing" };
      hasError = true;
    }
    return hasError;
  }

  private _addTask() {
    const hasError = this._validation();
    if (hasError) {
      return;
    }

    const task = {
      id: Math.random().toString(),
      title: this.title,
      description: this.description,
      priority: this.priority,
      status: "To Do",
    };

    const options = {
      detail: { task },
      bubbles: true,
      composed: true,
    };

    this.title = "";
    this.description = "";
    this.priority = "";

    this.dispatchEvent(new CustomEvent("task-added", options));
  }
}
