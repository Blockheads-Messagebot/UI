import sass from 'rollup-plugin-sass'
import typescript from 'rollup-plugin-typescript2'
import string from 'rollup-plugin-string'

export default {
    input: 'src/index.ts',
    output: {
        file: 'index.js',
        format: 'es',
        globals: {
            '@bhmb/bot': '@bhmb/bot'
        }
    },
    plugins: [
        string({ include: '**/*.html'}),
        sass({ output: 'index.css', options: { outputStyle: 'compressed' } }),
        typescript(),
    ],
    external: [
        '@bhmb/bot',
    ],
};
