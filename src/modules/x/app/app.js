import { LightningElement, track } from 'lwc';

let counter = 0

export default class extends LightningElement {
  static renderMode = 'light'
  @track data = {
    rows: [],
    foo: 0
  }

  @track mutatable = []

  onAdd () {
    let count = ++counter
    const row = {
      id: count,
      num: count
    }
    this.data.rows.push(row)
    this.mutatable.push(row)
  }


  onMutate () {
    this.mutatable.forEach(row => {
      row.num++
    })
    this.data.foo++
  }

  onClear () {
    this.data.rows = []
    console.log('Cleared, but this.mutatable still has length', this.mutatable.length)
  }
}
