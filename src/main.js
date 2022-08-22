import { createElement } from "lwc";
import App from "x/app";

const elm = createElement("x-app", { is: App });
document.body.appendChild(elm);

console.log(`customElements.get('x-app') is:`, customElements.get('x-app'))
