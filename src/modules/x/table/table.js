import { LightningElement, track } from 'lwc';
import { dataStates } from 'x/data'

export default class Table extends LightningElement {
	@track children = [];

	_rendered = false
	async renderedCallback() {
		if (this._rendered) {
			return
		}
		this._rendered = true

		for (const dataState of dataStates) {
			await new Promise(resolve => setTimeout(resolve))
			this.children = dataState
		}
	}
}
