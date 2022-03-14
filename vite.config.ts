import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      process: "process/browser",
      'stream-browserify': "stream-browserify",
      'stream': "stream-browserify",
      zlib: "browserify-zlib",
      // util: 'util'
      crypto: "crypto-browserify",
      // stream: "stream-browserify",
      // assert: "assert",
      // http: "stream-http",
      // https: "https-browserify",
      // os: "os-browserify",
      // url: "url",
    }
  },
  plugins: [react()]
})
