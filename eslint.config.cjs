const auto = require('eslint-config-canonical/configurations/auto');
const ava = require('eslint-config-canonical/configurations/ava');
const node = require('eslint-config-canonical/configurations/node');

module.exports = [
  ...auto,
  ava.recommended,
  {
    files: ['**/*.cjs'],
    ...node.recommended,
  },
  {
    rules: {
      'no-template-curly-in-string': 0,
    },
  },
  {
    ignores: [
      'package-lock.json',
      'dist',
      'node_modules',
      'src/pg-formatter',
      '*.log',
      '.*',
      '!.github',
      '!.gitignore',
      '!.husky',
      '!.releaserc',
    ],
  },
];
