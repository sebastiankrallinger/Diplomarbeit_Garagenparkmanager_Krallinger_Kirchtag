import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react'; // React-Plugin f�r Vite

export default defineConfig(({ mode }) => {
    const isDevelopment = mode === 'development';

    return {
        plugins: [react()], // React-Plugin einbinden
        server: {
            https: isDevelopment, // HTTPS nur in der Entwicklungsumgebung aktivieren
        },
        build: {
            outDir: 'dist', // Zielordner f�r den Produktions-Build
        },
        preview: {
            https: false, // HTTPS f�r Preview-Server deaktivieren
        },
        resolve: {
            alias: {
                '@': '/src', // Alias f�r k�rzere Importpfade
            },
        },
        css: {
            preprocessorOptions: {
                scss: {
                    additionalData: `@import "src/styles/global.scss";`, // Beispiel f�r globale SCSS-Dateien
                },
            },
        },
    };
});