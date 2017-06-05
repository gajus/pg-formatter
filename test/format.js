// @flow

import test from 'ava';
import {
  format
} from '../src';

test('formats SQL', (t) => {
  const result = format('SELECT foo FROM bar');

  t.true(result === 'SELECT\n    foo\nFROM\n    bar\n');
});

test('{anonymize: true}', (t) => {
  const result = format('SELECT \'foo\' FROM \'bar\'', {
    anonymize: true
  });

  t.true(result !== 'SELECT\n    \'foo\'\nFROM\n    \'bar\'\n');
  t.true(/SELECT\s+'[^']+'\s+FROM\s+'[^']+'/i.test(result));
});

test('{stripComments: true} block comment', (t) => {
  const result = format('SELECT /* foo */', {
    stripComments: true
  });

  t.true(result === 'SELECT\n');
});

test('{stripComments: true} inline comment', (t) => {
  const result = format('SELECT -- foo', {
    stripComments: true
  });

  t.true(result === 'SELECT\n');
});

// @see https://github.com/darold/pgFormatter/issues/30
// test('{functionCase: unchanged}', (t) => {
//   const result = format('SELECT tEsT()', {
//     functionCase: 'unchanged'
//   });
//
//   t.true(result === 'SELECT tEsT()\n');
// });
//
// test('{functionCase: uppercase}', (t) => {
//   const result = format('sElEcT', {
//     functionCase: 'uppercase'
//   });
//
//   t.true(result === 'SELECT\n');
// });
//
// test('{functionCase: lowercase}', (t) => {
//   const result = format('sElEcT', {
//     functionCase: 'lowercase'
//   });
//
//   t.true(result === 'select\n');
// });
//
// test('{functionCase: capitalize}', (t) => {
//   const result = format('sElEcT', {
//     functionCase: 'capitalize'
//   });
//
//   t.true(result === 'Select\n');
// });

test('{keywordCase: unchanged}', (t) => {
  const result = format('sElEcT', {
    keywordCase: 'unchanged'
  });

  t.true(result === 'sElEcT\n');
});

test('{keywordCase: uppercase}', (t) => {
  const result = format('sElEcT', {
    keywordCase: 'uppercase'
  });

  t.true(result === 'SELECT\n');
});

test('{keywordCase: lowercase}', (t) => {
  const result = format('sElEcT', {
    keywordCase: 'lowercase'
  });

  t.true(result === 'select\n');
});

test('{keywordCase: capitalize}', (t) => {
  const result = format('sElEcT', {
    keywordCase: 'capitalize'
  });

  t.true(result === 'Select\n');
});

test('{spaces: 2}', (t) => {
  const result = format('SELECT 1', {
    spaces: 2
  });

  t.true(result === 'SELECT\n  1\n');
});
