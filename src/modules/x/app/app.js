import { LightningElement, track } from 'lwc';
//
const columns = [
  { label: 'Account Name', fieldName: 'Account', type: 'lookup', typeAttributes: {
      objectApiName : 'Account', compactLayout: true
    }},
  { label: 'Name', fieldName: 'Name', type: 'lookup', typeAttributes: {
      reference : 'Id', objectApiName : 'Contact', compactLayout: true
    }},
  { label: 'Birthdate', fieldName: 'Birthdate', type: 'date' },
  { label: 'Email', fieldName: 'Email', type: 'email' },
  { label: 'Phone', fieldName: 'Phone', type: 'phone' },
  { label: 'Mailing Street', fieldName: 'MailingStreet', type: 'text' },
  { label: 'Last Modified', fieldName: 'LastModifiedDate', type: 'date-time' },
  { label: 'Last Modified By', fieldName: 'LastModifiedBy', type: 'hidden' },
  { label: 'Status', type: 'button', typeAttributes: {
      label: { fieldName: 'Contact_Status__c' }, title: 'Click to toggle', name: 'edit_status', iconName: 'utility:edit', values : ['Active', 'Inactive']
    }},
  { label: '', type: 'button', typeAttributes: {
      label: 'Delete', title: 'Click to delete', name: 'delete', disabled: {fieldName: 'Disabled'},
    }}
];
//
export default class Tests extends LightningElement {
  get columns() {
    return this._columns || [];
  }
  set columns(value) {
    let columns = [];
    clone(value).map((col, key) => {
      const res = { key : 'c' + key, ...col };
      if(col.type?.toLowerCase() === 'action') {
        this.rowActions = col?.typeAttributes?.rowActions || [];
        return;
      }
      res.isHidden = col.type?.toLowerCase() === 'hidden';
      const isNotValue = ['button', 'icon', 'button-icon'].includes(col.type?.toLowerCase());
      res.sortable = isNotValue ? false : res.sortable !== false;
      res.searchable = isNotValue ? false : res.searchable !== false;
      res.resizable = isNotValue ? false : res.resizable !== false;
      res.style = `flex: var(--column-flex-${key}, 1 0 0);`;
      columns = [...columns, res];
    });
    this._columns = columns;
    this.processRows(Object.values(this.rows));
  }

  get rows() {
    return this._rows || {};
  }
  set rows(value) {
    this._rows = this.processRows(clone(value));
  }

  keyField = "Id";
  start = 100;
  end = 105;
  scroll = false;
  offsetY;

  processRows(rows) {
    let processedRows = [], rawRows = {};
    for(let i = 0, len = rows?.length; i < len; i++) {
      const row = rows[i], key = row[this.keyField] || `r${processedRows.length}`;
      rawRows[key] = row;
      processedRows.push({
        key : key,
        fields : (() => {
          let fields = [];
          for(let j = 0, jlen = this.columns?.length; j < jlen; j++) {
            const col = this.columns[j];
            fields.push({ key : key + '_' + col.key, label : col.label, value : row[col.fieldName], style : col.style });
          }
          return fields;
        })()
      });
    }
    this.processedRows = processedRows;
    this.renderList(true);
    return rawRows;
  }

  @track visibleRows = [];
  rowHeight = 17;

  connectedCallback() {
    this.columns = columns;
    this.rows = ((count) => {
      let array = [];
      for(let i = 0; i < count; i++) {
        array.push({
          "Disabled":true, "Id":"0" + i,
          "Name":"Dummy User " + i,
          "Email":"crane.cochran@nokia.com",
          "CreatedDate":"2021-01-08T19:33:16.000Z",
          "LastModifiedDate":"2022-03-22T11:49:58.000Z",
          "LastModifiedById":"0052M000008cHCoQAN",
          "Contact_Status__c":"Active",
          "Account":{"Name":"Dummy Account","Id":"0011D00000meUxVQBU"},
          "LastModifiedBy":{"Name":"Tiago Almeida","Id":"0052M000008cHCoQAN"}
        });
      }
      return array;
    })(250);
    window.addEventListener('scroll',(e) => this.scrollHandler(e), { capture: true, passive : true });
  }

  disconnectedCallback() {
    window.removeEventListener('scroll',(e) => this.scrollHandler(e));
  }

  scrollHandler(event) {
    event.stopPropagation();
    this.renderList();
  }

  renderList(force) {
    if(!this.scroll) { return this.visibleRows = this.processedRows.slice(this.start, this.end); }
    //
    if(!this._container) { this._container = this.template.querySelector('.container'); }
    const margin = 2, count = this.processedRows?.length || 0;
    const visibleRows = Math.max(Math.ceil((window.innerHeight) / this.rowHeight), 1) + (margin * 2);
    let start = this._container ? Math.max(0, Math.floor(-this._container.getBoundingClientRect().top / this.rowHeight) - margin) : 0;
    start = (start % 2 == 1 ? start - 1 : start);
    if(!force && this._lastStart == start) { return; }
    const changeAmount = start - this._lastStart;
    this._lastStart = start;
    if(force) {
      if(this._container) { this._container.style.height = (count * this.rowHeight) + 'px'; }
      this.visibleRows = this.processedRows.slice(start, Math.min((start + visibleRows), count));
      this.offsetY = `transform: translateY(${(start * this.rowHeight)}px);`;
      return;
    }
    //
    if(changeAmount > 0) {
      let end = Math.min((start + visibleRows), count);
      if(this._lastEnd == end) { return; }
      this.visibleRows.push(...this.processedRows.slice(end - changeAmount, end));
      this._lastEnd = end;
      this.visibleRows.splice(0, changeAmount);
      this.offsetY = `transform: translateY(${(start * this.rowHeight)}px);`;
    }
    else {
      this._lastEnd = Math.min((start + visibleRows), count);
      this.visibleRows.unshift(...this.processedRows.slice(start, start + (-changeAmount)));
      this.offsetY = `transform: translateY(${(start * this.rowHeight)}px);`;
      this.visibleRows.splice(this.visibleRows.length + changeAmount, -changeAmount);
    }
  }

  moveDown() {
    console.log('moveDown')
    const amount = 2;
    this.start = Math.max(this.start + amount, 0);
    this.end = Math.min(this.end + amount, this.processedRows?.length || 0);
    console.log('old keys', this.visibleRows.map(_ => _.key))
    this.visibleRows = this.processedRows.slice(this.start, this.end);
    console.log('new keys', this.visibleRows.map(_ => _.key))
  }

  moveUp() {
    console.log('moveUp')
    const amount = 2;
    this.start = Math.max(this.start - amount, 0);
    this.end = Math.min(this.end - amount, this.processedRows?.length || 0);
    console.log('old keys', this.visibleRows.map(_ => _.key))
    this.visibleRows = this.processedRows.slice(this.start, this.end);
    console.log('new keys', this.visibleRows.map(_ => _.key))
  }
}

const clone = (obj) => JSON.parse(JSON.stringify(obj));
