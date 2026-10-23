import auto from 'eslint-config-canonical/auto';
import * as ava from 'eslint-config-canonical/ava';
import * as node from 'eslint-config-canonical/node';

export default [
  ...auto,
  ...ava.recommended,
  ...node.recommended.map((configuration) => ({
    files: ['**/*.cjs'],
    ...configuration,
  })),
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
