import sass from 'rollup-plugin-sass'
import typescript from 'rollup-plugin-typescript2'
import string from 'rollup-plugin-string'

import { unlinkSync, existsSync } from 'fs'
// Avoid build errors, unfortunately doesn't fix --watch
for (let name of ['index.d.ts', 'polyfill.d.ts', 'api.d.ts']) {
    if (existsSync(`${__dirname}/${name}`)) unlinkSync(`${__dirname}/${name}`)
}

export default {
    input: 'src/index.ts',
    output: {
        file: 'index.js',
        format: 'es'
    },
    plugins: [
        sass({ output: 'index.css', options: { outputStyle: 'compressed' } }),
        typescript(),
        string({ include: '**/*.html'})
    ],
    external: [
        '@bhmb/bot',
    ],
    globals: {
        '@bhmb/bot': '@bhmb/bot'
    }
};