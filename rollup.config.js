const path = require('path')
const uglify = require("rollup-plugin-uglify").uglify;
const commonjs = require('rollup-plugin-commonjs')
const babel = require('rollup-plugin-babel');
const resolve = require('rollup-plugin-node-resolve');
const postcss = require('rollup-plugin-postcss')
const json = require('@rollup/plugin-json')
const postcssNesting = require('postcss-nesting');
const simpleVars = require('postcss-simple-vars');
const postcssPresetEnv = require('postcss-preset-env');
const url = require("postcss-url")
const pkg = require(path.resolve('package.json'))
const external = Object.keys(pkg.dependencies)

const plugins = [,
  json({
    include: 'src/**',
    exclude: ['node_modules']
  }),
  postcss({
    plugins: [
      simpleVars(),
      postcssNesting(),
      postcssPresetEnv(),
      require('cssnano')(),
      url({
        url: 'inline'
      }),
      // require('postcss-modules')({
      //   generateScopedName: '[local]__[hash:base64:5]'
      // })
    ],
    extensions: ['.scss']
  }),
  resolve({
    mainFields: ["jsnext", "main", "browser"]
  }),
  commonjs(),
  babel({
    exclude: 'node_modules/**',
    runtimeHelpers: true
  }),
  uglify()
]

module.exports = {
  plugins,
  external,
  globals: Object.keys(external).map(value => ({ [value]: value }))
}
