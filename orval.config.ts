import { defineConfig } from 'orval'


export default defineConfig({
    base: {
        input: {
            target: './swagger.json',
        },
        output: {
            target: './api/schema.ts',
            schemas: './model/api',
            mode: 'split',
            client: 'swr',
            httpClient: 'fetch'
        },
    },
})