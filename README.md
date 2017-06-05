# pg-formatter

[![Travis build status](http://img.shields.io/travis/gajus/pg-formatter/master.svg?style=flat-square)](https://travis-ci.org/gajus/pg-formatter)
[![Coveralls](https://img.shields.io/coveralls/gajus/pg-formatter.svg?style=flat-square)](https://coveralls.io/github/gajus/pg-formatter)
[![NPM version](http://img.shields.io/npm/v/pg-formatter.svg?style=flat-square)](https://www.npmjs.org/package/pg-formatter)
[![Canonical Code Style](https://img.shields.io/badge/code%20style-canonical-blue.svg?style=flat-square)](https://github.com/gajus/canonical)
[![Twitter Follow](https://img.shields.io/twitter/follow/kuizinas.svg?style=social&label=Follow)](https://twitter.com/kuizinas)

A PostgreSQL SQL syntax beautifier.

> Note:
> This project is a thin wrapper of a https://github.com/darold/pgFormatter.
> Execution of the module relies on Perl being available on the host system.

## Usage

```js
import {
  format
} from 'pg-formatter';

format(`SELECT foo FROM bar`);

```

## Configuration

|Configuration|Default|Description|`pgFormatter` equivalent|
|---|---|---|
|`anonymize`|`false`|Obscure all literals in queries, useful to hide confidential data before formatting.|`anonymize`|
|`functionCase`|`unchanged`|Change the case of the function names. Values: "unchanged", "lowercase", "uppercase", "capitalize"|`function-case`|
|`keywordCase`|`unchanged`|Change the case of the reserved keyword. Values: "unchanged", "lowercase", "uppercase", "capitalize"|`keyword-case`|
|`spaces`|`4`|Number of spaces to indent the code.|`spaces`|
|`stripComments`|`false`|Remove any comment from SQL code.|`nocomment`|
