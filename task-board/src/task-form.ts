import { LitElement, css, html, render } from "lit";
import { customElement, state } from "lit/decorators.js";

@customElement("task-form")
export class TaskForm extends LitElement {
  static styles = css``;

  @state()
  title: string = "";

  @state()
  description: string = "";

  @state()
  priority: string = "";

  render() {
    return html` <div class="form-container">
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
    </div>`;
  }

  private _addTask() {
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
