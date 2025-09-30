import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    tailwindcss()
  ],
  base: "/Xishi/",
  build: {
    outDir: "docs",  // 打包輸出到 docs/
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'), // @ 指向 src 目录
    },
  },
})
