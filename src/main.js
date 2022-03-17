import '@lwc/synthetic-shadow'
import { createElement } from "lwc";
import App from "x/app";

lwcRuntimeFlags.ENABLE_MIXED_SHADOW_MODE = true

const elm = createElement("x-app", { is: App });
document.body.appendChild(elm);
