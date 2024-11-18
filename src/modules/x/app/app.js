import { LightningElement } from 'lwc';

export default class extends LightningElement {
  constructor() {
    super()
    this.__bigObject = new ArrayBuffer(10000000)
  }
}
