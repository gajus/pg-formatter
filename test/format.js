// @flow

import test from 'ava';
import {
  format,
} from '../src';

test('formats SQL', (t) => {
  const result = format('SELECT foo FROM bar');

  t.is(result, 'SELECT\n    foo\nFROM\n    bar\n');
});

test('{anonymize: true}', (t) => {
  const result = format('SELECT \'foo\' FROM \'bar\'', {
    anonymize: true,
  });

  t.not(result, 'SELECT\n    \'foo\'\nFROM\n    \'bar\'\n');
  t.regex(result, /select\s+'[^']+'\s+from\s+'[^']+'/i);
});

test('{stripComments: true} block comment', (t) => {
  const result = format('SELECT /* foo */', {
    stripComments: true,
  });

  t.is(result, 'SELECT\n');
});

test('{stripComments: true} inline comment', (t) => {
  const result = format('SELECT -- foo', {
    stripComments: true,
  });

  t.is(result, 'SELECT\n');
});

test('{functionCase: unchanged}', (t) => {
  const result = format('lOwEr()', {
    functionCase: 'unchanged',
  });

  t.is(result, 'lOwEr()\n');
});

// @see https://github.com/darold/pgFormatter/issues/30
// eslint-disable-next-line ava/no-skip-test
test.skip('{functionCase: unchanged} custom function', (t) => {
  const result = format('concat_lower_or_upper()', {
    functionCase: 'unchanged',
  });

  t.is(result, 'concat_lower_or_upper()\n');
});

// @see https://github.com/darold/pgFormatter/issues/30
// eslint-disable-next-line ava/no-skip-test
test.skip('{functionCase: unchanged} custom function with parameters', (t) => {
  const result = format('concat_lower_or_upper(123)', {
    functionCase: 'unchanged',
  });

  t.is(result, 'concat_lower_or_upper(123)\n');
});

test('{functionCase: uppercase}', (t) => {
  const result = format('lOwEr()', {
    functionCase: 'uppercase',
  });

  t.is(result, 'LOWER()\n');
});

test('{functionCase: lowercase}', (t) => {
  const result = format('lOwEr()', {
    functionCase: 'lowercase',
  });

  t.is(result, 'lower()\n');
});

test('{functionCase: capitalize}', (t) => {
  const result = format('lOwEr()', {
    functionCase: 'capitalize',
  });

  t.is(result, 'Lower()\n');
});

test('{keywordCase: unchanged}', (t) => {
  const result = format('sElEcT', {
    keywordCase: 'unchanged',
  });

  t.is(result, 'sElEcT\n');
});

test('{keywordCase: uppercase}', (t) => {
  const result = format('sElEcT', {
    keywordCase: 'uppercase',
  });

  t.is(result, 'SELECT\n');
});

test('{keywordCase: lowercase}', (t) => {
  const result = format('sElEcT', {
    keywordCase: 'lowercase',
  });

  t.is(result, 'select\n');
});

test('{keywordCase: capitalize}', (t) => {
  const result = format('sElEcT', {
    keywordCase: 'capitalize',
  });

  t.is(result, 'Select\n');
});

test('{spaces: 2}', (t) => {
  const result = format('SELECT 1', {
    spaces: 2,
  });

  t.is(result, 'SELECT\n  1\n');
});

test('{tabs: true}', (t) => {
  const result = format('SELECT 1', {
    tabs: true,
  });

  t.is(result, 'SELECT\n\t1\n');
});

test('{placeholder: <<(?:.*)?>>}', (t) => {
  const result = format('SELECT <<foo>>', {
    placeholder: '<<(?:.*)?>>',
  });

  t.is(result, 'SELECT\n    <<foo>>\n');
});
