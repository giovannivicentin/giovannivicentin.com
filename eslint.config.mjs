import rocketseatConfig from '@rocketseat/eslint-config/react.mjs'
import eslintConfigPrettier from 'eslint-config-prettier'
import nextConfig from 'eslint-config-next/core-web-vitals'

const config = [
  {
    ignores: ['.next/**', 'coverage/**', 'next-env.d.ts', 'node_modules/**'],
  },
  ...rocketseatConfig,
  ...nextConfig,
  eslintConfigPrettier,
  {
    rules: {
      '@typescript-eslint/no-empty-object-type': 'off',
      '@typescript-eslint/no-require-imports': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      '@stylistic/indent': 'off',
      '@stylistic/max-len': 'off',
      '@stylistic/multiline-ternary': 'off',
      'no-undef': 'off',
      'react-hooks/set-state-in-effect': 'off',
    },
  },
]

export default config
