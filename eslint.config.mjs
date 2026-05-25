import rocketseatConfig from '@rocketseat/eslint-config/react.mjs'
import nextConfig from 'eslint-config-next/core-web-vitals'

const config = [
  ...rocketseatConfig,
  ...nextConfig,
  {
    rules: {
      '@typescript-eslint/no-empty-object-type': 'off',
      '@typescript-eslint/no-require-imports': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      'no-undef': 'off',
      'react-hooks/set-state-in-effect': 'off',
    },
  },
]

export default config
