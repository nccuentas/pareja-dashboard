import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

const REPO_NAME = "pareja-dashboard"; // 👈 IMPORTANTE

export default defineConfig({
  base: `/${REPO_NAME}/`, // ✅ CLAVE PARA GITHUB PAGES

  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: [
        "favicon.svg",
        "pwa-192.png",
        "pwa-512.png"
      ],
      manifest: {
        name: "Diario de Pareja",
        short_name: "Pareja",
        description: "Check-in emocional diario para la pareja ❤️",

        // ✅ RUTAS CORRECTAS
        start_url: `/${REPO_NAME}/`,
        scope: `/${REPO_NAME}/`,

        display: "standalone",
        theme_color: "#0f172a",
        background_color: "#020617",
        lang: "es-CO",

        icons: [
          {
            src: `/${REPO_NAME}/pwa-192.png`,
            sizes: "192x192",
            type: "image/png"
          },
          {
            src: `/${REPO_NAME}/pwa-512.png`,
            sizes: "512x512",
            type: "image/png"
          }
        ]
      }
    })
  ]
});
