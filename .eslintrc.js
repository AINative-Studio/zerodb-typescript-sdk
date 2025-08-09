module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  },
  extends: [
    'eslint:recommended',
    '@typescript-eslint/recommended'
  ],
  plugins: [
    '@typescript-eslint'
  ],
  rules: {
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/no-unused-vars': 'error',
    '@typescript-eslint/no-empty-function': 'warn',
    'prefer-const': 'error',
    'no-var': 'error'
  },
  env: {
    browser: true,
    node: true,
    es6: true,
    jest: true
  },
  ignorePatterns: [
    'dist/',
    'node_modules/',
    '*.js'
  ]
};