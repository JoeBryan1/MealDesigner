import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from "vite-tsconfig-paths";

const target = "https://meal-designer-api-fshcgpckhyfpf9bv.uksouth-01.azurewebsites.net/";

// https://vitejs.dev/config/
export default defineConfig ({
    plugins: [react(), tsconfigPaths()],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    },
    server: {
        proxy: {
            '^/api': {
                target,
                changeOrigin: true
            }
        },
        port: 5173
    }
})
