const devMode = (process.env.NODE_ENV === 'development');
console.log(`${ devMode ? 'development' : 'production' } mode bundle`);

import livereload from 'rollup-plugin-livereload';

export default {
    input: 'client/js/index.js',
    plugins: [
        devMode ? livereload({delay: 100, watch: 'client/**/*', port: 1338}) : false
    ],
    output: {
      file: 'client/js/bundle.js',
      format: 'iife'
    }
  };