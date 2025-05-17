/** @type {import('eslint').Linter.Config} */
const config = {
  extends: [
    'next',
    'next/core-web-vitals',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  rules: {
    '@typescript-eslint/no-unused-vars': 'off',
    'react-hooks/exhaustive-deps': 'off',
    'react/jsx-key': 'error',
    'import/no-anonymous-default-export': 'off',
  },
  ignorePatterns: ['**/*.d.ts', '**/*.config.js', '**/*.config.ts'],
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        '@typescript-eslint/explicit-module-boundary-types': 'off',
      },
    },
  ],
  env: {
    node: true,
    browser: true,
    es2022: true,
  },
}

export default config
