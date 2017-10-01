import {readFileSync} from 'fs'
import babel from 'rollup-plugin-babel'
import filesize from 'rollup-plugin-filesize'
import resolve from 'rollup-plugin-local-resolve'

const pkg = JSON.parse(readFileSync('./package.json'))
const dependencies = Object.keys(pkg.dependencies || {})

export default {
  entry: 'lib/index.js',
  dest: 'dist/index.js',
  external: dependencies,
  format: 'cjs',
  plugins: [
    babel({
      babelrc: false,
      presets: [
        [
          'env',
          {
            targets: {
              node: 4
            },
            modules: false
          }
        ],
        'stage-0',
        'flow'
      ],
      plugins: [
        'external-helpers',
        'transform-object-rest-spread',
        [
          'flow-runtime',
          {
            annotate: true,
            assert: true
          }
        ]
      ]
    }),
    resolve(),
    filesize()
  ]
}
