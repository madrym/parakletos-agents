module.exports = {
  root: true,
  env: {
    es2021: true,
    node: true,
  },
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  rules: {
    // Basic rules for development
    'no-console': 'off',
    'no-unused-vars': 'warn',
    'no-undef': 'warn',
    'prefer-const': 'warn',
    'no-var': 'error',
  },
  ignorePatterns: [
    'node_modules/',
    'ios/',
    'android/',
    '*.config.js',
    'metro.config.js',
    'babel.config.js',
    'dist/',
    'build/',
  ],
}; 