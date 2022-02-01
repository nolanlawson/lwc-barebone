import App from "x/app";
import Component from 'x/component';

customElements.define('x-app', App.CustomElementConstructor);
customElements.define('x-component', Component.CustomElementConstructor);

const app = document.createElement('x-app')
document.body.appendChild(app)
