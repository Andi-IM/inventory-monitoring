import { dirname } from 'path';
import { fileURLToPath } from 'url';
import laravel from 'laravel-vite-plugin';
import { defineConfig } from 'vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
    build: {
        outDir: '../../public/build-borrowing',
        emptyOutDir: true,
        manifest: true,
    },
    plugins: [
        laravel({
            publicDirectory: '../../public',
            buildDirectory: 'build-borrowing',
            input: [
                __dirname + '/resources/assets/sass/app.scss',
                __dirname + '/resources/assets/js/app.js'
            ],
            refresh: true,
        }),
        // Uncomment the plugin for your frontend framework:
        // vue({
        //     template: {
        //         transformAssetUrls: {
        //             base: null,
        //             includeAbsolute: false,
        //         },
        //     },
        // }),
        // react(),
        // svelte(),
    ],
    resolve: {
        alias: {
            '@': __dirname + '/resources/js',
        },
    },
});
