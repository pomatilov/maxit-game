import { resolve } from 'path';
import { defineConfig } from 'vite';

import eslintPlugin from 'vite-plugin-eslint';
import { VitePWA } from 'vite-plugin-pwa';

import vue from '@vitejs/plugin-vue';

export default defineConfig({
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
  optimizeDeps: { exclude: ['swiper/vue', 'swiper/types'] },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@/global.scss";`,
      },
    },
  },
  plugins: [
    vue(),
    eslintPlugin(),
    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: 'auto',
      manifest: {
        name: 'MaxIt',
        short_name: 'MaxIt',
        description: 'Max It Game',
        theme_color: '#e10d63',
        background_color: '#ffffff',
        display: 'standalone',
        orientation: 'portrait',
        start_url: '/',
        icons: [
          { src: '/android-chrome-192x192.png', sizes: '192x192', type: 'image/png', purpose: 'any maskable' },
          { src: '/android-chrome-512x512.png', sizes: '512x512', type: 'image/png', purpose: 'any maskable' },
        ],
      },
    }),
  ],
});
