import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['img/icons/impulse_logo.jpg'],
      manifest: {
        name: '北谷町商工会青年部',
        short_name: '青年部',
        description: '北谷町商工会青年部の部員情報共有およびビジネスマッチングシステム',
        theme_color: '#3B82F6',
        background_color: '#ffffff',
        display: 'standalone',
        orientation: 'portrait',
        icons: [
          {
            src: 'img/icons/impulse_logo.jpg',
            sizes: '192x192',
            type: 'image/jpeg',
            purpose: 'any maskable',
          },
          {
            src: 'img/icons/impulse_logo.jpg',
            sizes: '512x512',
            type: 'image/jpeg',
            purpose: 'any maskable',
          },
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
