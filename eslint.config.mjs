import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import globals from "globals";
import pluginImport from "eslint-plugin-import";
import prettier from "eslint-config-prettier/flat";

export default tseslint.config(
    eslint.configs.recommended,
    tseslint.configs.recommended,
    {
        name: "language-options",
        files: "./src/**/*.ts",
        languageOptions: {
            ecmaVersion: 2022,
            sourceType: "module",
            globals: {
                ...globals.node
            }
        }
    },
    {
        name: "import-config",
        files: "./src/**/*.ts",
        extends: [pluginImport.flatConfigs.recommended, pluginImport.flatConfigs.typescript],
        rules: {
            'import/newline-after-import': 'error',
            'import/order': [
                'warn',
                {
                    alphabetize: {
                        order: 'asc',
                        caseInsensitive: true,
                    },
                    groups: [
                        'builtin',
                        'type',
                        'external',
                        'internal',
                        ['parent', 'sibling', 'index'],
                    ],
                    'newlines-between': 'always',
                },
            ]
        }
    },
    prettier
)
