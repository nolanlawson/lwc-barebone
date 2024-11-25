import vm  from 'vm'
import express from 'express'
import lwcRollupPlugin  from "@lwc/rollup-plugin"
import { nodeResolve }  from '@rollup/plugin-node-resolve'
import virtual  from '@rollup/plugin-virtual'
import replace  from '@rollup/plugin-replace'
import { rollup }  from 'rollup'
import * as ssrRuntime from '@lwc/ssr-runtime'

const app = express()

async function generateHtml() {
  const bundle = await rollup({
    input: 'virtual-entry',
    external: [
      '@lwc/ssr-runtime'
    ],
    plugins: [
      virtual({
        'virtual-entry': `
import App from 'x/app'
import { renderComponent } from '@lwc/ssr-runtime'
globalThis.renderedComponent = renderComponent('x-app', App, {})
         `.trim(),
      }),
      nodeResolve(),
      lwcRollupPlugin({
        modules: [
          { dir: "./src/modules" },
        ],
        targetSSR: true
      })
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
    },
    require (pkgName) {
      if (pkgName === '@lwc/ssr-runtime') {
        return ssrRuntime
      }
      throw new Error('disallowed require: ' + pkgName)
    }
  }
  vm.createContext(context)
  vm.runInContext(code, context)
  const component = await context.renderedComponent

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
