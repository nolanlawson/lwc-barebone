import { LightningElement, api } from 'lwc';

export default class extends LightningElement {
  static renderMode = 'light'

  _data

  @api set data (val) {
    console.log('data setter called')
    this._data = val
  }

  get data () {
    return this._data
  }

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

  _foo

  @api set foo (val) {
    console.log('foo setter called')
    this._foo = val
  }

  get foo () {
    return this._foo
  }

}
