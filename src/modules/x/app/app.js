import { LightningElement } from 'lwc';

export default class extends LightningElement {
  items = Array(100).fill().map((_, i) => i)
}
