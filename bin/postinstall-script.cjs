const fs = require('node:fs');
const https = require('node:https');
const path = require('node:path');
const zlib = require('node:zlib');
const rimraf = require('rimraf');
const tar = require('tar-fs');

const destination = path.resolve(__dirname, '../src/pg-formatter');
const secondaryDestination = path.resolve(__dirname, '../dist/pg-formatter');
const libraryUrl = `https://github.com/darold/pgFormatter/archive/refs/tags/v5.9.tar.gz`;

rimraf.rimrafSync(destination);
rimraf.rimrafSync(secondaryDestination);
fs.mkdirSync(destination, { recursive: true });
fs.mkdirSync(secondaryDestination, { recursive: true });

const getAndUnpack = (url, callback) => {
  // eslint-disable-next-line consistent-return
  https.get(url, (response) => {
    if ([301, 302].includes(response.statusCode)) {
      return getAndUnpack(response.headers.location, callback);
    }

    const gunzip = zlib.createGunzip();
    const untar = tar.extract(destination, { strip: 1 });
    untar.on('finish', callback);

    response.pipe(gunzip).pipe(untar);
  });
};

getAndUnpack(libraryUrl, () => {
  fs.cpSync(destination, secondaryDestination, { recursive: true });
});
