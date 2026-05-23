import { customElement, state, property, query } from "lit/decorators.js";
import { LitElement, html, css } from "lit";
import "./task-column.ts";
import "./task-form.ts";
import "./task-modal.ts";

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
  showModal: boolean = false;

  @state()
  editingTask: {
    title: string;
    description: string;
    priority: string;
    id: string;
    status: string;
  } | null = null;

  render() {
    return html`
      <task-modal
        .editingTask=${this.editingTask}
        .showModal=${this.showModal}
        @show-modal=${this._closeModal}
        @update-task=${this._updateTask}
      >
      </task-modal>
      <task-form @task-added=${this._handleTaskAdded}></task-form>
      <div class="column-container">
        <task-column
          @task-deleted=${this._handleTaskDeleted}
          @task-edited=${this._handleTaskEdited}
          name="To Do"
          .tasks=${this.tasks.filter((task) => task.status === "To Do")}
        ></task-column>
        <task-column
          @task-deleted=${this._handleTaskDeleted}
          @task-edited=${this._handleTaskEdited}
          name="In Progress"
          .tasks=${this.tasks.filter((task) => task.status === "In Progress")}
        ></task-column>
        <task-column
          @task-deleted=${this._handleTaskDeleted}
          @task-edited=${this._handleTaskEdited}
          name="Done"
          .tasks=${this.tasks.filter((task) => task.status === "Done")}
        ></task-column>
      </div>
    `;
  }

  _handleTaskAdded(e: CustomEvent) {
    this.tasks = [...this.tasks, e.detail.task];
  }

  _handleTaskDeleted(e: CustomEvent) {
    this.tasks = this.tasks.filter((task) => task.id !== e.detail.id);
  }

  _handleTaskEdited(e: CustomEvent) {
    console.log(e.detail.id);
    console.log("fired!");
    this.showModal = e.detail.showModal;

    const taskToEdit =
      this.tasks.find((task) => task.id === e.detail.id) || null;

    this.editingTask = taskToEdit;
  }

  _handleShowModal(e: CustomEvent) {}

  _closeModal(e: CustomEvent) {
    this.showModal = e.detail.showModal;
  }

  _updateTask(e: CustomEvent) {
    this.tasks = this.tasks.map((task) =>
      e.detail.editedTask.id === task.id ? { ...e.detail.editedTask } : task,
    );
    this.showModal = e.detail.showModal;
  }
}
