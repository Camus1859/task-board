import { customElement, state, property, query } from "lit/decorators.js";
import { LitElement, html, css } from "lit";
import { Task } from "./types.ts";
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

    .space {
      margin-bottom: var(--modal-space, 12px);
    }
  `;
  @property()
  name: string = "";

  @state()
  tasks: Task[] = [
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
  editingTask: Task | null = null;

  @state()
  isLoading: boolean = false;

  @state()
  hasError: boolean = false;

  @state()
  filterSelected: string = "all";

  @state()
  sortSelected: string = "none";

  render() {
    if (this.isLoading) {
      return html`<p>Loading tasks...</p>`;
    }
    if (this.hasError) {
      return html`<p>Failed to load tasks</p>`;
    }
    if (this.tasks.length === 0) {
      return html`
        <task-form @task-added=${this._handleTaskAdded}></task-form>
        <p>No tasks yet</p>
      `;
    }
    return html`
      <task-modal
        .editingTask=${this.editingTask}
        .showModal=${this.showModal}
        @show-modal=${this._closeModal}
        @update-task=${this._updateTask}
      >
      </task-modal>
      <task-form @task-added=${this._handleTaskAdded}></task-form>
      <div class="space"></div>

      Filter:
      <select
        class="filter-option"
        .value=${this.filterSelected}
        @change=${(e: Event) => {
          this.filterSelected = (e.target as HTMLSelectElement).value;
        }}
      >
        <option value="all">All</option>
        <option value="high">High</option>
        <option value="medium">Medium</option>
        <option value="low">Low</option>
      </select>
      <div class="column-container">
        <task-column
          @task-deleted=${this._handleTaskDeleted}
          @task-edited=${this._handleTaskEdited}
          name="To Do"
          .tasks=${this._filterByPriority("To Do")}
        ></task-column>
        <task-column
          @task-deleted=${this._handleTaskDeleted}
          @task-edited=${this._handleTaskEdited}
          name="In Progress"
          .tasks=${this._filterByPriority("In Progress")}
        ></task-column>
        <task-column
          @task-deleted=${this._handleTaskDeleted}
          @task-edited=${this._handleTaskEdited}
          name="Done"
          .tasks=${this._filterByPriority("Done")}
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

  _filterByPriority(status: string) {
    return this.tasks.filter((task) => {
      if (this.filterSelected === "all") {
        return task.status === status;
      } else {
        return (
          task.status === status &&
          task.priority === this.filterSelected.toLocaleLowerCase()
        );
      }
    });
  }
}
