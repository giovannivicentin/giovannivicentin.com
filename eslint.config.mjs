import nextPlugin from '@next/eslint-plugin-next'
import eslint from '@eslint/js'
import eslintConfigPrettier from 'eslint-config-prettier'
import reactHooks from 'eslint-plugin-react-hooks'
import globals from 'globals'
import tseslint from 'typescript-eslint'

const config = tseslint.config(
  {
    ignores: [
      '.next/**',
      'coverage/**',
      'next-env.d.ts',
      'node_modules/**',
      'public/**',
    ],
  },
  {
    linterOptions: {
      reportUnusedDisableDirectives: 'warn',
    },
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ['**/*.{js,mjs,cjs,ts,tsx}'],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  },
  nextPlugin.configs['core-web-vitals'],
  reactHooks.configs.flat['recommended-latest'],
  {
    rules: {
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ],
      curly: ['error', 'all'],
      eqeqeq: ['error', 'always'],
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'no-debugger': 'error',
      'no-var': 'error',
      'object-shorthand': ['error', 'always'],
      'prefer-const': [
        'error',
        {
          destructuring: 'all',
          ignoreReadBeforeAssign: true,
        },
      ],
      'react-hooks/set-state-in-effect': 'off',
    },
  },
  eslintConfigPrettier,
)

export default config
