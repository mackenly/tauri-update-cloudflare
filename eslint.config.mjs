import eslint from '@eslint/js';
import tseslint from '@typescript-eslint/eslint-plugin';
import tseslintParser from '@typescript-eslint/parser';
import prettierPlugin from 'eslint-plugin-prettier';
import stylisticTs from '@stylistic/eslint-plugin-ts';

export default [
    eslint.configs.recommended,
    {
        files: ['eslint.config.mjs'],
        languageOptions: {
            sourceType: 'module',
            ecmaVersion: 'latest'
        }
    },
    {
        files: ['**/*.{ts,tsx}'],
        languageOptions: {
            parser: tseslintParser,
            parserOptions: {
                project: './tsconfig.json',
                tsconfigRootDir: import.meta.dirname,
                ecmaVersion: 'latest',
                sourceType: 'module'
            },
            globals: {
                // Cloudflare Workers globals
                Request: 'readonly',
                Response: 'readonly',
                Headers: 'readonly',
                fetch: 'readonly',
                FormData: 'readonly',
                Blob: 'readonly',
                File: 'readonly',
                crypto: 'readonly',
                WebSocket: 'readonly',
                URLPattern: 'readonly',
                URL: 'readonly',
                URLSearchParams: 'readonly',
                // Cloudflare specific globals
                caches: 'readonly',
                addEventListener: 'readonly',
                IncomingRequestCfProperties: 'readonly',
                ExecutionContext: 'readonly',
                // Environment globals
                console: 'readonly',
                // Custom globals
                webcm: 'writable'
            }
        },
        plugins: {
            '@typescript-eslint': tseslint,
            prettier: prettierPlugin,
            '@stylistic/ts': stylisticTs
        },
        rules: {
            'prettier/prettier': ['error', { semi: true }],
            'no-unused-vars': 'off',
            '@typescript-eslint/no-unused-vars': [
                'warn',
                { ignoreRestSiblings: true, argsIgnorePattern: '^_' }
            ],
            '@stylistic/ts/semi': ['warn', 'always'],
            '@typescript-eslint/explicit-module-boundary-types': 'off',
            '@typescript-eslint/no-explicit-any': 'warn',
            'no-console': 'off',
            // Disable no-undef as TypeScript handles this better
            'no-undef': 'off'
        },
        settings: {
            'import/resolver': {
                typescript: {
                    project: './tsconfig.json'
                }
            }
        }
    },
    {
        files: ['**/*.d.ts'],
        rules: {
            'no-undef': 'off'
        }
    },
    {
        files: ['**/*.js'],
        languageOptions: {
            sourceType: 'module',
            ecmaVersion: 'latest',
            globals: {
                webcm: 'writable'
            }
        }
    },
    {
        ignores: ['dist/', '.wrangler/', 'node_modules/']
    }
];
