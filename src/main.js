import '@lwc/synthetic-shadow'
import { createElement } from "lwc";
import App from "x/app";

const div = document.createElement('div')
document.body.appendChild(div);

const elm = createElement("x-app", { is: App });
div.appendChild(elm)

console.log('div.innerHTML', div.innerHTML)
console.log('div.outerHTML', div.outerHTML)
console.log('div.textContent', div.textContent)
