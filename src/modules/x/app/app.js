import { LightningElement } from 'lwc';

export default class App extends LightningElement {
  showSlot = true

  toggle () {
    this.showSlot = !this.showSlot
  }
}
