import App from "x/app";

customElements.define('x-app', App.CustomElementConstructor);
document.body.appendChild(document.createElement('x-app'));
