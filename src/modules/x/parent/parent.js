import { LightningElement } from 'lwc';

export default class extends LightningElement {
  foo = false

  renderedCallback() {
    setTimeout(() => {
      this.foo = true
    }, 1000)
  }
}
