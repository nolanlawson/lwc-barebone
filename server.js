const express = require('express')
const lwcRollupPlugin = require("@lwc/rollup-plugin");
const { nodeResolve } = require('@rollup/plugin-node-resolve')
const replace = require('@rollup/plugin-replace')
const { rollup } = require('rollup')
const fs = require('fs/promises')
const path = require('path')
const os = require('os')

const app = express()

app.get('/', async (req, res) => {

  const bundle = await rollup({
    input: './src/renderComponentToString.js',
    plugins: [
      nodeResolve(),
      lwcRollupPlugin({
        modules: [
          { dir: "./modules" },
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

  const tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), 'lwc-barebone-'));
  const serverFile = path.join(tmpDir, 'app.server.cjs')

  await bundle.write({
    file: serverFile,
    format: 'cjs',
    exports: 'named',
  });
  const { render } = require(serverFile)

  const component = render()

  res.send(`
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
  `.trim())
})
app.use(express.static('dist'))

app.listen(3000)
