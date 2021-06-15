import { createElement } from "lwc";
import App from "x/app";

lwcRuntimeFlags.ENABLE_LIGHT_DOM_COMPONENTS = true

const elm = createElement("x-app", { is: App });
document.body.appendChild(elm);

const div = document.createElement('div')
div.textContent = 'other div'
document.body.appendChild(div)