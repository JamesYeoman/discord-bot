module.exports = {
  env: {
    browser: true,
    amd: true,
    node: true,
  },
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['import', 'prettier'],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:import/typescript',
    'plugin:prettier/recommended',
  ],
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
  },
  rules: {
    '@typescript-eslint/no-shadow': ['error'],
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
        pathGroups: [
          { pattern: '@dsrbmm/**', group: 'internal' },
          { pattern: './*.css', group: 'index', position: 'after' },
        ],
        'newlines-between': 'always',
      },
    ],
    'prettier/prettier': 'error',
  },
};
