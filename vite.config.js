import {
  defineConfig
} from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  css: {
    preprocessorOptions: {
      less: {
        modifyVars: {
          // hack: `true; @import (reference) "${resolve("src/assets/less/index.less")}";`,
        },
        javascriptEnabled: true,
        additionalData: '@import "./src/styles/util.less";',
      },
    },
  }
})