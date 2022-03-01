import { LightningElement } from 'lwc';

export default class App extends LightningElement {
  connectedCallback() {
    console.log('connected callback phase')
  }
}
