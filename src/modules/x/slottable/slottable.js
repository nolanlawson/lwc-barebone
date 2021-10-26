import { LightningElement } from 'lwc';

export default class extends LightningElement {
  handleSlotChange() {
    console.log('slot change', [...this.querySelectorAll('slot')])
  }
}
