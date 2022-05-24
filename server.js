const express = require('express')
const lwcRollupPlugin = require("@lwc/rollup-plugin");
const { nodeResolve } = require('@rollup/plugin-node-resolve')
const virtual = require('@rollup/plugin-virtual');
const replace = require('@rollup/plugin-replace')
const { rollup } = require('rollup')
const vm = require('vm');

const app = express()

async function generateHtml() {
  const bundle = await rollup({
    input: 'virtual-entry',
    plugins: [
      virtual({
        'virtual-entry': `
import App from 'x/app'
import { renderComponent } from '@lwc/engine-server'
globalThis.renderedComponent = renderComponent('x-app', App, {})
         `.trim(),
      }),
      nodeResolve(),
      lwcRollupPlugin({
        modules: [
          { dir: "./src/modules" },
        ],
      }),
      // temporary fix for https://github.com/salesforce/lwc/pull/2852
      replace({
        preventAssignment: false,
        values: {
          'window.__lwcResetWarnedOnVersionMismatch': 'globalThis.__lwcResetWarnedOnVersionMismatch'
        }
      }),
      // Replace `import { foo } from 'lwc'` with '@lwc/engine-server'
      replace({
        preventAssignment: true,
        delimiters: ['', ''],
        values: {
          'from "lwc"': `from "@lwc/engine-server"`,
          "from 'lwc'": `from "@lwc/engine-server"`,
        },
      }),
    ],
  });

  const { output } = await bundle.generate({
    format: 'cjs',
    exports: 'named',
  });
  const { code } = output[0];
  const context = {
    process: {
      env: {
        NODE_ENV: process.env.NODE_ENV || 'production'
      }
    }
  }
  vm.createContext(context)
  vm.runInContext(code, context)
  const component = context.renderedComponent

  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>LWC barebone - SSR</title>
</head>
<body>
  ${component}  
  <script type="module" src="main.js"></script>
</body>
</html>
  `.trim()
  return html
}

let cachedHtml = process.env.NODE_ENV === 'production' && generateHtml()

app.get('/', async (req, res) => {
  res.send(await (cachedHtml || generateHtml()))
})
app.use(express.static('dist'))

app.listen(3000)
