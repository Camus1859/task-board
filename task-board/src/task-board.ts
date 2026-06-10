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
      background-color: white;
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
  tasks: Task[] = [];

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
  sortSelected: string = "default";

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
      <div class="space"></div>

      Sort:
      <select
        class="sort-option"
        .value=${this.sortSelected}
        @change=${(e: Event) => {
          this.sortSelected = (e.target as HTMLSelectElement).value;
        }}
      >
        <option value="default">Default</option>
        <option value="high-low">high-low</option>
        <option value="low-high">low-high</option>
      </select>
      <div class="column-container">
        <task-column
          @task-dropped=${this._handleTaskDrop}
          @task-deleted=${this._handleTaskDeleted}
          @task-edited=${this._handleTaskEdited}
          name="To Do"
          .tasks=${this._filterByPriority("To Do")}
        ></task-column>
        <task-column
          @task-dropped=${this._handleTaskDrop}
          @task-deleted=${this._handleTaskDeleted}
          @task-edited=${this._handleTaskEdited}
          name="In Progress"
          .tasks=${this._filterByPriority("In Progress")}
        ></task-column>
        <task-column
          @task-dropped=${this._handleTaskDrop}
          @task-deleted=${this._handleTaskDeleted}
          @task-edited=${this._handleTaskEdited}
          name="Done"
          .tasks=${this._filterByPriority("Done")}
        ></task-column>
      </div>
    `;
  }

  async _handleTaskAdded(e: CustomEvent) {
    try {
      const postResponse = await fetch("/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(e.detail.task),
      });
      if (!postResponse.ok) throw new Error("Failed to add task");
      this.tasks = await postResponse.json();
    } catch (e) {
      console.error(e);
    }
  }

  async _handleTaskDeleted(e: CustomEvent) {
    try {
      const deleteResponse = await fetch(`/api/tasks/${e.detail.id}`, {
        method: "DELETE",
      });
      if (!deleteResponse.ok) throw new Error("Failed to delete task");
      this.tasks = await deleteResponse.json();
    } catch (e) {
      console.error(e);
    }
  }

  _handleTaskEdited(e: CustomEvent) {
    this.showModal = e.detail.showModal;

    const taskToEdit =
      this.tasks.find((task) => task.id === e.detail.id) || null;

    this.editingTask = taskToEdit;
  }

  _closeModal(e: CustomEvent) {
    this.showModal = e.detail.showModal;
  }

  async _updateTask(e: CustomEvent) {
    try {
      const putResponse = await fetch(`/api/tasks/${e.detail.editedTask.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(e.detail.editedTask),
      });
      if (!putResponse.ok) throw new Error("Failed to update task");
      this.tasks = await putResponse.json();
      this.showModal = e.detail.showModal;
    } catch (e) {
      console.error(e);
    }
  }

  _filterByPriority(status: string) {
    const priorityOrder: { [key: string]: number } = {
      high: 1,
      medium: 2,
      low: 3,
    };
    const filtered = this.tasks.filter((task) => {
      if (this.filterSelected === "all") {
        return task.status === status;
      } else {
        return (
          task.status === status &&
          task.priority === this.filterSelected.toLocaleLowerCase()
        );
      }
    });

    if (this.sortSelected === "default") {
      return filtered;
    }

    return filtered.sort((a: Task, b: Task) => {
      if (this.sortSelected === "high-low") {
        return priorityOrder[a.priority] - priorityOrder[b.priority];
      } else {
        return priorityOrder[b.priority] - priorityOrder[a.priority];
      }
    });
  }

  async connectedCallback() {
    super.connectedCallback();

    try {
      this.isLoading = true;

      const response = await fetch(`/api/tasks`);
      if (!response.ok) throw new Error("Unable to fetch data");

      const data = await response.json();

      this.tasks = data;
    } catch (e) {
      this.isLoading = false;
      this.hasError = true;

      console.error(e);
    } finally {
      this.isLoading = false;
    }
  }

  async _handleTaskDrop(e: CustomEvent) {
    try {
      const response = await fetch(`/api/tasks/${e.detail.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: e.detail.columnName }),
      });
      if (!response.ok) throw new Error("Unable to fetch data");

      const data = await response.json();

      this.tasks = data;
    } catch (e) {
      console.error(e);
    }
  }
}
