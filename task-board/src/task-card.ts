import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("task-card")
export class TaskCard extends LitElement {
  static styles = css`
    :host {
      display: block;
    }

    div {
      border: 1px solid black;
      padding: 20px;
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
  `;

  @property()
  title: string = "";

  @property()
  description: string = "";

  @property()
  priority: string = "";

  render() {
    return html`
      <div>
        <section class="title-section">Title: ${this.title}</section>
        <section class="title-description">
          Description: ${this.description}
        </section>
        <section
          class="priority-${this._propertyColor(this.priority)} title-priority"
        >
          Priority: ${this.priority}
        </section>
      </div>
    `;
  }

  private _propertyColor = (priority: string): string => {
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
}
