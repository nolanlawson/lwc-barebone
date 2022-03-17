import { LightningElement } from 'lwc';
import native from './native.css'
import synthetic from './synthetic.css'
import template from './component.html'

export default class Component extends LightningElement {
  render() {
    const stylesheets = this.template.synthetic ? synthetic : native
    const stylesheetToken = this.template.synthetic ? 'foobarbaz' : undefined
    Object.assign(template, { stylesheets, stylesheetToken })
    return template
  }
}
