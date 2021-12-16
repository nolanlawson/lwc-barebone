import { createElement } from "lwc";
import App from "x/app";

document.body.appendChild(createElement("x-app", { is: App }));

const template = document.createElement('template')
template.content.appendChild(createElement("x-app", { is: App }))
