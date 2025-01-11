import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import plugin from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';
import child_process from 'child_process';
import { env } from 'process';

const isDevelopment = process.env.NODE_ENV !== 'production';

const baseFolder =
    env.APPDATA !== undefined && env.APPDATA !== ''
        ? `${env.APPDATA}/ASP.NET/https`
        : `${env.HOME}/.aspnet/https`;

const certificateName = "garagenparkmanager.client";
const certFilePath = path.join(baseFolder, `${certificateName}.pem`);
const keyFilePath = path.join(baseFolder, `${certificateName}.key`);

// Nur im Entwicklungsmodus die Zertifikate verwenden
let httpsOptions = {};
if (isDevelopment && fs.existsSync(certFilePath) && fs.existsSync(keyFilePath)) {
    httpsOptions = {
        key: fs.readFileSync(keyFilePath),
        cert: fs.readFileSync(certFilePath),
    };
}

export default defineConfig({
    plugins: [plugin()],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    },
    build: {
        rollupOptions: {
            external: ['js-cookie', 'jwt-decode'],
        }
    },
    server: {
        open: true,
        https: httpsOptions,
        proxy: {
            '^/home': {
                target: 'https://localhost:7186',
                secure: false
            },
            '/data': {
                target: 'https://data.statistik.gv.at',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/data/, ''),
            }
        },
        port: 5173,
    }
});
