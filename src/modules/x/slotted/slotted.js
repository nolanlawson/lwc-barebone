import { LightningElement } from 'lwc';

export default class extends LightningElement {
  renderedCallback() {
    console.log('<x-slotted> hydrated')
  }
}
