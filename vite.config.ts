import { resolve } from 'path';
import { defineConfig } from 'vite';

import eslintPlugin from 'vite-plugin-eslint';
import { VitePWA } from 'vite-plugin-pwa';
import mkcert from 'vite-plugin-mkcert';

import vue from '@vitejs/plugin-vue';

export default defineConfig({
  // server: {
  //   https: true,
  // },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
  optimizeDeps: { exclude: ['swiper/vue', 'swiper/types'] },
  plugins: [
    vue(),
    eslintPlugin(),
    // mkcert(),
    VitePWA({
      registerType: 'autoUpdate',
      // strategies: 'injectManifest',
      injectRegister: 'auto',
      manifest: {
        name: 'MaxIt',
        short_name: 'MaxIt',
        description: 'Max It Game',
        theme_color: '#e10d63',
        background_color: '#ffffff',
        display: 'standalone',
        start_url: '/',
        icons: [
          { src: '/android-chrome-192x192.png', sizes: '192x192', type: 'image/png', purpose: 'any maskable' },
          { src: '/android-chrome-512x512.png', sizes: '512x512', type: 'image/png', purpose: 'any maskable' },
        ],
      },
    }),
  ],
});
