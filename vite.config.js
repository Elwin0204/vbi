import {
  defineConfig
} from 'vite';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  base: './',
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
  },
  server: {
    host: '0.0.0.0',
    port: 8080,
    fs: {
      strict: false
    }
  },
  build: {
    minify: 'terser',
    outDir: 'docs',
    assetsDir: 'assets',
    sourcemap: false,
    chunkSizeWarningLimit: 1500,
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    },
    // rollupOptions: {
    //   output: {
    //     manualChunks(id) {
    //       if (id.includes('node_modules')) {
    //         return id.toString().split('node_modules/')[1].split('/')[0].toString();
    //       }
    //     },
    //     chunkFileNames: (chunkInfo) => {
    //       const facadeModuleId = chunkInfo.facadeModuleId ? chunkInfo.facadeModuleId.split('/') : [];
    //       const fileName = facadeModuleId[facadeModuleId.length - 2] || '[name]';
    //       return `js/${fileName}/[name].[hash].js`;
    //     }
    //   }
    // }
  }
})