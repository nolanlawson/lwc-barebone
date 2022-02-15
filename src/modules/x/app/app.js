import { LightningElement, track } from 'lwc';

export default class App extends LightningElement {
  @track data = { foo: 'foo', bar: { baz: 'baz' } }

  renderedCallback() {
    console.log('data', this.data)
    console.log('this', this)
  }

}
