import '@lwc/synthetic-shadow'
import { createElement } from "lwc";
import App from "x/app";

const elm = createElement("x-app", { is: App });

const div = document.createElement('div')
div.appendChild(elm);

document.body.appendChild(div);

console.log('inner HTML is', div.innerHTML)
