import { LightningElement, api } from 'lwc';

export default class extends LightningElement {

  _num

  @api set num (val) {
    console.log('num setter called')
    this._num = val
  }

  get num () {
    return this._num
  }

  renderedCallback() {
    console.log('Re-rendered')
  }
}
