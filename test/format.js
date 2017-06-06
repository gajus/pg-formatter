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

test('{functionCase: unchanged}', (t) => {
  const result = format('lOwEr()', {
    functionCase: 'unchanged'
  });

  t.true(result === 'lOwEr()\n');
});

test('{functionCase: uppercase}', (t) => {
  const result = format('lOwEr()', {
    functionCase: 'uppercase'
  });

  t.true(result === 'LOWER()\n');
});

test('{functionCase: lowercase}', (t) => {
  const result = format('lOwEr()', {
    functionCase: 'lowercase'
  });

  t.true(result === 'lower()\n');
});

test('{functionCase: capitalize}', (t) => {
  const result = format('lOwEr()', {
    functionCase: 'capitalize'
  });

  t.true(result === 'Lower()\n');
});

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

test('{placeholder: <<(?:.*)?>>}', (t) => {
  const result = format('SELECT <<foo>>', {
    placeholder: '<<(?:.*)?>>'
  });

  t.true(result === 'SELECT\n    <<foo>>\n');
});
