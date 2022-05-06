import { LightningElement, api } from 'lwc';

class NotAnLwcComponent {
  @api foo = 'foo'
}

console.log(new NotAnLwcComponent()) // avoid tree-shaking it

export default class App extends LightningElement {}
