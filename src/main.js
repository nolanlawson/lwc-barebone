import { hydrateComponent } from "lwc";
// import App from "x/app";
import Slottable from 'x/slottable'

hydrateComponent(document.querySelector('x-app').shadowRoot.querySelector('x-slottable'), Slottable);
