import "@lwc/synthetic-shadow"
import { createElement } from "lwc";
import App from "x/app";

const elm = createElement("x-app", { is: App });
document.body.appendChild(elm);

const component = document.querySelector('x-app').shadowRoot.querySelector('x-component')
const [ rect ] = component.getClientRects()
const x = rect.x + (rect.width / 2)
const y = rect.y + (rect.height / 2)
const elements = document.elementsFromPoint(x, y)

console.log('elementsFromPoint', elements)
