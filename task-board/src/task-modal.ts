import { LitElement, css, html } from "lit";
import { customElement, property, state } from "lit/decorators.js";

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
    }

    .close-btn {
      position: absolute;
      right: 15px;
      top: 10px;
      font-size: 24px;
      cursor: pointer;
    }
  `;

  @property()
  showModal: boolean = false;

  render() {
    if (this.showModal) {
      return html`<div class="modal-overlay">
        <div class="modal-content">
          <span @click=${this._closeModal} class="close-btn">&times;</span>
          <h2>Basic Modal</h2>
          <p>This is a centered modal window.</p>
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
}
