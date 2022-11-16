import { createElement } from "lwc";
import App from "x/app";

customElements.define('third-party', class extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' }).innerHTML = '<div>I am a third-party custom element!</div>'
  }

})

const elm = createElement("x-app", { is: App });
document.body.appendChild(elm);
