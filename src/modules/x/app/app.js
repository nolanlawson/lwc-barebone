import { LightningElement, track } from 'lwc';

let counter = 0

export default class extends LightningElement {
  @track rows = []

  @track mutatable = []

  onAdd () {
    let count = ++counter
    const row = {
      id: count,
      num: count
    }
    this.rows.push(row)
    this.mutatable.push(row)
  }


  onMutate () {
    this.mutatable.forEach(row => {
      row.num++
    })
  }

  onClear () {
    this.rows = []
    console.log('Cleared, but this.mutatable still has length', this.mutatable.length)
  }
}
