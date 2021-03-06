import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import uglify from 'rollup-plugin-uglify';
import pkg from './package.json';

export default [
  {
    input: 'src/index.js',
    output: {
      name: 'vue-postal',
      file: pkg.browser,
      format: 'umd'
    },
    plugins: [resolve(), commonjs(), uglify()]
  },
  {
    input: 'src/index.js',
    output: [
      { file: pkg.main, format: 'cjs' },
      { file: pkg.module, format: 'es' }
    ],
    plugins: [resolve(), commonjs(), uglify()]
  }
];
