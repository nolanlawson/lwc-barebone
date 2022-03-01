import { createElement } from "lwc";
import App from "x/app";

class VanillaCustomElement extends HTMLElement {
  connectedCallback() {
    console.log('connected callback phase')
  }
}
customElements.define('x-vanilla', VanillaCustomElement)


function test(elm) {
  const template = document.createElement('template');
  console.log('appending to template content')
  template.content.appendChild(elm);
  console.log('appending template content to document.body')
  document.body.appendChild(template.content);
}

console.log("--- lightning element ---")
test(createElement("x-app", {is: App}))
console.log("--- vanilla custom element ---")
test(document.createElement('x-vanilla'))
