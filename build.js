const livereload = require('livereload')
const sassCompiler = require('node-sass')
const fs = require('fs')
const path = require('path')
const { promisify } = require('util')
const pug = require('pug')
const { rollup } = require('rollup')

/* Configurable options */
const liveReloadPort = 35729
const scssFilePath = '/src/styles.scss'
const rollupPlugins = []

/* Helpers */
const sassRender = promisify(sassCompiler.render)
const writeFile = promisify(fs.writeFile)

/* Bundling for pug templates, CSS, and clientside JS */
const bundleHTML = async () => {
  const html = pug.renderFile(__dirname + '/src/index.pug', {
    env: process.env.MODE,
    liveReloadPort,
  })
  await writeFile(__dirname + '/public/index.html', html)
}

const bundleCSS = async () => {
  const file = __dirname + scssFilePath
  const { css } = await sassRender({ file })
  await writeFile(__dirname + '/public/styles.css', css)
}

const bundleJS = async () => {
  const bundle = await rollup({
    input: 'src/script.js',
    plugins: rollupPlugins,
  })
  await bundle.write({
    entryFileNames: 'not-a-react-bundle.js',
    dir: 'public',
    format: 'esm',
  })
}

const consoleLogGreen = (text) => {
  console.log('\u001b[1m\u001b[32m' + text + '\u001b[39m\u001b[22m')
}

/* Actual build script */
;(async () => {
  if (!fs.existsSync(__dirname + '/public/')) {
    fs.mkdirSync('public')
  }

  await Promise.all([bundleHTML(), bundleCSS(), bundleJS()])
  consoleLogGreen('Built successfully!')

  if (process.env.MODE === 'dev') {
    fs.watch(__dirname + '/src', { recursive: true }, async (_, filePath) => {
      process.stdout.write('\r\x1b[K')
      process.stdout.write('Rebuilding...')

      const fileExtension = path.extname(filePath)
      if (fileExtension === '.pug') {
        await bundleHTML()
      } else if (fileExtension === '.scss') {
        await bundleCSS()
      } else {
        await bundleJS()
      }

      process.stdout.write(`\r\x1b[KRebuilt changes to ${filePath}`)
    })
  }

  if (process.env.MODE === 'dev') {
    const server = livereload.createServer({ port: liveReloadPort }, () =>
      consoleLogGreen('Live reload enabled')
    )
    server.watch(__dirname + '/public')
  }
})()
