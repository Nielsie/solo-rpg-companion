import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import {VitePWA} from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
      react(),
      VitePWA({
          registerType: 'autoUpdate',
          /*devOptions: {
              enabled: true,
          },*/
          // add this to cache all the imports
          workbox: {
              globPatterns: ["**/*"],
          },
          // add this to cache all the
          // static assets in the public folder
          includeAssets: [
              "**/*",
          ],
          manifest: {
              name: 'Solo RPG Companion',
              short_name: 'solo-rpg-companion',
              description: 'My Awesome App description',
              theme_color: '#ffffff',
              icons: [
                  {
                      src: 'android-chrome-192x192.png',
                      sizes: '192x192',
                      type: 'image/png'
                  },
                  {
                      src: 'android-chrome-512x512.png',
                      sizes: '512x512',
                      type: 'image/png'
                  },
              ],
          },
      }),
  ],
  server: {
    host: true,
  },
})
