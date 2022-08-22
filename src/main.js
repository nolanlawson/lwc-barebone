import { hydrateComponent } from "lwc";
import App from "x/app";

hydrateComponent(document.querySelector('x-app'), App);

console.log(`customElements.get('x-app') is:`, customElements.get('x-app'))
