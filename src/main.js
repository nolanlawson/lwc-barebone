import '../minimal-synthetic-shadow-repro.js'
import { createElement } from "lwc";
import App from "x/app";

let elm
const add = document.createElement('button')
add.onclick = () => {
  for (let i = 0; i < 1; i++) {
    elm = createElement("x-app", {is: App});
    document.body.appendChild(elm);
  }
}
add.textContent = 'Add'
document.body.appendChild(add)

const remove = document.createElement('button')
remove.onclick = () => {
  document.body.removeChild(elm)
  elm = undefined
}
remove.textContent = 'Remove'
document.body.appendChild(remove)
