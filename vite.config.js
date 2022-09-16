/*
 * @Descripttion: 
 * @version: 
 * @Author: lc
 * @Date: 2022-09-16 10:15:58
 * @LastEditors: lc
 * @LastEditTime: 2022-09-16 11:17:16
 */

import {
  defineConfig
} from "vite"
import vue from "@vitejs/plugin-vue"
// 组件自动引入
import AutoImport from 'unplugin-auto-import/vite'
// 可以组件直接设置name值
import vueSetupExtend from 'vite-plugin-vue-setup-extend'
import viteCompression from "vite-plugin-compression"

import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve("./src"),
      assets: path.resolve("./src/assets"),
      img: path.resolve("./src/assets/img"),
      api: path.resolve("./src/api"),
      utils: path.resolve("./src/utils"),
      components: path.resolve("./src/components"),
      views: path.resolve("./src/views"),
      packages: path.resolve("./src/packages"),
    },
  },
  css: {
    preprocessorOptions: {
      // 设置 scss 公用变量文件
      scss: {
        additionalData: `@import "./src/assets/css/var.scss";`,
      },
    },
  },
  build: {
    assetsDir: "./static",
    chunkSizeWarningLimit: 500,
    minify: "terser",
    cssCodeSplit: true, // 如果设置为false，整个项目中的所有 CSS 将被提取到一个 CSS 文件中
    terserOptions: {
      compress: {
        // warnings: false,
        drop_console: true, //打包时删除console
        drop_debugger: true, //打包时删除 debugger
        pure_funcs: ["console.log"],
      },
      output: {
        // 去掉注释内容
        comments: true,
      },
    },
    rollupOptions: {
      output: {
        manualChunks: {
          // 拆分代码，这个就是分包，配置完后自动按需加载，现在还比不上webpack的splitchunk，不过也能用了。
          vue: ["vue", "vue-router", "vuex"],
          echarts: ["echarts"],
        },
      },
    },
    brotliSize: false,
  },
  // 代理
  server: {
    host: "0.0.0.0",
    port: "8800",
    proxy: {
      "/api": {
        historyApiFallback: true,
        target: "http://192.168.1.19/", // 测试
        changeOrigin: true,
      },
    },
  },
  // 插件
  plugins: [
    vue(),
    vueSetupExtend(),
    viteCompression(),
    AutoImport({
      include: [
        /\.[tj]sx?$/,
        /\.vue$/,
        /\.vue\?vue/,
      ],
      dts: true,
      imports: ['vue']
    })
  ],
})