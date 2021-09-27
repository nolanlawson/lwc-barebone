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
  static renderMode = 'light'

  renderedCallback() {
    for (const prop of props) {
      console.log('light', 'this.' + prop, this[prop])
    }
  }
}
