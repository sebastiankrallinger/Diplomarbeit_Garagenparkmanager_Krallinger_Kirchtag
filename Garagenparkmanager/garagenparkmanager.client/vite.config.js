import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue'; // Beispiel: Plugin für Vue.js
// Falls du kein Plugin verwendest, kannst du diese Zeile entfernen

export default defineConfig(({ mode }) => {
  const isDevelopment = mode === 'development';

  return {
    plugins: [vue()], // Plugins, falls benötigt
    server: {
      https: isDevelopment, // HTTPS nur in der Entwicklungsumgebung aktivieren
    },
    build: {
      outDir: 'dist', // Zielordner für den Produktions-Build
    },
    preview: {
      https: false, // HTTPS für Preview-Server deaktivieren
    },
    resolve: {
      alias: {
        '@': '/src', // Alias für kürzere Importpfade
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@import "src/styles/global.scss";`, // Beispiel für globale SCSS-Dateien
        },
      },
    },
  };
});
