module.exports = {
  extends: ['canonical/auto', 'canonical/node'],
  ignorePatterns: ['dist', 'package-lock.json'],
  overrides: [
    {
      files: '*.ts',
      rules: {
        'import/no-cycle': 0,
      },
    },
    {
      extends: ['canonical/ava'],
      files: '*.test.ts',
    },
  ],
  root: true,
  rules: {
    'no-template-curly-in-string': 0,
    'node/no-sync': 0,
  },
};
