import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react'; // React-Plugin für Vite

export default defineConfig(({ mode }) => {
    const isDevelopment = mode === 'development';

    return {
        plugins: [react()], // React-Plugin einbinden
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