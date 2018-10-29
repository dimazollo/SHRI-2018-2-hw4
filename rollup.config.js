import typescript from 'rollup-plugin-typescript';

export default {
  input: './src/app.ts',
  plugins: [
    typescript()
  ],
  output: {
    format: 'cjs',
    file: 'server.js',
    dir: 'dist'
  }
}
