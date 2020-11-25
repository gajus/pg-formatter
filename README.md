# pg-formatter

[![Travis build status](http://img.shields.io/travis/gajus/pg-formatter/master.svg?style=flat-square)](https://travis-ci.org/gajus/pg-formatter)
[![Coveralls](https://img.shields.io/coveralls/gajus/pg-formatter.svg?style=flat-square)](https://coveralls.io/github/gajus/pg-formatter)
[![NPM version](http://img.shields.io/npm/v/pg-formatter.svg?style=flat-square)](https://www.npmjs.org/package/pg-formatter)
[![Canonical Code Style](https://img.shields.io/badge/code%20style-canonical-blue.svg?style=flat-square)](https://github.com/gajus/canonical)
[![Twitter Follow](https://img.shields.io/twitter/follow/kuizinas.svg?style=social&label=Follow)](https://twitter.com/kuizinas)

A PostgreSQL SQL syntax beautifier.

> Note:
>
> This project is a thin wrapper of https://github.com/darold/pgFormatter.
> Execution of the module relies on Perl being available on the host system.

## Usage

```js
import {
  format
} from 'pg-formatter';

format(`SELECT foo FROM bar`);

```

## Configuration

|Configuration|Format|Default|Description|`pgFormatter` equivalent|
|---|---|---|---|---|
|`anonymize`|boolean|`false`|Obscure all literals in queries, useful to hide confidential data before formatting.|`anonymize`|
|`functionCase`|string ("unchanged", "lowercase", "uppercase", "capitalize")|`unchanged`|Change the case of the function names.|`function-case`|
|`keywordCase`|string ("unchanged", "lowercase", "uppercase", "capitalize")|`unchanged`|Change the case of the reserved keyword.|`keyword-case`|
|`placeholder`|string (regex)|N/A|Regex to find code that must not be changed.|`placeholder`|
|`spaces`|number|`4`|Number of spaces to indent the code.|`spaces`|
|`stripComments`|boolean|`false`|Remove any comment from SQL code.|`nocomment`|
|`tabs`|boolean|`false`|Use tabs instead of spaces. When `true`, the `spaces` option is ignored.|`tabs`|
