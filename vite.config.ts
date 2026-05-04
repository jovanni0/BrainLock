import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from "vite-plugin-svgr"
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(), 
    svgr(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      devOptions: {
        enabled: true // This allows the plugin to work in dev mode
      },
      manifest: {
        name: 'BrainLock Quiz',
        short_name: 'BrainLock',
        description: 'Secure, self-hosted quiz app',
        theme_color: '#ffffff',
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ],

  envPrefix: ['VITE_', 'API_'],

  server: {
    proxy: {
      "/api": {
        target: "http://localhost:9173",
        changeOrigin: true
      }
    }
  },

  optimizeDeps: {
    include: ['object-hash'], 
  },
})
