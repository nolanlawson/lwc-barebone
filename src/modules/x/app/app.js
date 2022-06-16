import { LightningElement, track } from 'lwc';

export default class extends LightningElement {
    @track rows = [];

    add() {
        this.rows.push({ id: 1 });
    }
}
