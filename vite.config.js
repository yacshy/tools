import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import AutoImport from 'unplugin-auto-import/vite'

// https://vite.dev/config/
export default defineConfig({
    base: '/tools',
    plugins: [
        vue(),
        tailwindcss(),
        AutoImport({
            imports: ['vue', 'vue-router']
        })
    ],
    build: {
        outDir: 'docs'
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src')
        }
    }
})
