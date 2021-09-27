import {LightningElement} from "lwc";

const props = [
  'children',
  'childNodes',
  'firstChild',
  'firstElementChild',
  'lastChild',
  'lastElementChild',
]

export default class extends LightningElement {

  renderedCallback() {
    for (const prop of props) {
      console.log('shadow', 'this.template.' + prop, this.template[prop])
    }
  }
}
