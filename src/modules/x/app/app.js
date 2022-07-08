import { LightningElement } from 'lwc';

export default class extends LightningElement {

  dynamicClass = 'yolo'

  click() {
    console.log('Hydration is working')
  }
}
