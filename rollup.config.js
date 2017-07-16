import {readFileSync} from 'fs'
import babel from 'rollup-plugin-babel'
import filesize from 'rollup-plugin-filesize'

const pkg = JSON.parse(readFileSync('./package.json'))
const dependencies = Object.keys(pkg.dependencies || {})

export default [
  {
    entry: 'lib/bill/bill-factory.js',
    dest: 'dist/bill/bill-factory.js',
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
        plugins: ['external-helpers']
      }),
      filesize()
    ]
  },
  {
    entry: 'lib/bradesco/index.js',
    dest: 'dist/bradesco/index.js',
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
        plugins: ['external-helpers']
      }),
      filesize()
    ]
  }
]
