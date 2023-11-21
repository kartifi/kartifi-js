import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    test: {
        // browser: {
        //     enabled: true,
        //     name: 'chrome',
        // },

        // css: false,
        globals: true,
        environment: 'jsdom',
        // setupFiles: []
    },

})