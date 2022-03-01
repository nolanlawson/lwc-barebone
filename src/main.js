import { createElement } from "lwc";
import App from "x/app";

class VanillaCustomElement extends HTMLElement {
  connectedCallback() {
    console.log('connected callback phase')
  }
}
customElements.define('x-vanilla', VanillaCustomElement)


function test(elm) {
  const div = document.createElement('div');
  console.log('appending to div')
  div.appendChild(elm);
  console.log('appending div to document.body')
  document.body.appendChild(div);
}

console.log("--- lightning element ---")
test(createElement("x-app", {is: App}))
console.log("--- vanilla custom element ---")
test(document.createElement('x-vanilla'))
