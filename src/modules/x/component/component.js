import { LightningElement } from 'lwc';
import native from './native.html'
import synthetic from './synthetic.html'
import template from './component.html'

export default class Component extends LightningElement {
  render() {
    const { stylesheets, stylesheetToken } = this.template.synthetic ? synthetic : native
    Object.assign(template, { stylesheets, stylesheetToken })
    return template
  }
}
