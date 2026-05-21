import { LitElement, css, html } from "lit";
import { customElement, property, state } from "lit/decorators.js";

@customElement("my-element")
export class MyElement extends LitElement {
  static styles = css`
    :host {
      color: blue;
    }
  `;

  @property()
  name?: string = "Anderson";

  @state()
  private _count: number = 0;

  render() {
    return html`<p>Hello, ${this.name}!</p>
      the count is ${this._count}
      <button @click=${this._increment}>Click Me!</button> `;
  }

  private _increment(e: Event) {
    this._count++;
  }
}
