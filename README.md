# egg-gridfs

[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![Test coverage][codecov-image]][codecov-url]
[![David deps][david-image]][david-url]
[![Known Vulnerabilities][snyk-image]][snyk-url]
[![npm download][download-image]][download-url]

[npm-image]: https://img.shields.io/npm/v/egg-gridfs.svg?style=flat-square
[npm-url]: https://npmjs.org/package/egg-gridfs
[travis-image]: https://img.shields.io/travis/eggjs/egg-gridfs.svg?style=flat-square
[travis-url]: https://travis-ci.org/eggjs/egg-gridfs
[codecov-image]: https://img.shields.io/codecov/c/github/eggjs/egg-gridfs.svg?style=flat-square
[codecov-url]: https://codecov.io/github/eggjs/egg-gridfs?branch=master
[david-image]: https://img.shields.io/david/eggjs/egg-gridfs.svg?style=flat-square
[david-url]: https://david-dm.org/eggjs/egg-gridfs
[snyk-image]: https://snyk.io/test/npm/egg-gridfs/badge.svg?style=flat-square
[snyk-url]: https://snyk.io/test/npm/egg-gridfs
[download-image]: https://img.shields.io/npm/dm/egg-gridfs.svg?style=flat-square
[download-url]: https://npmjs.org/package/egg-gridfs

<!--
Description here.
-->

## Install

```bash
$ npm i egg-gridfs --save
```

## Usage

```js
// {app_root}/config/plugin.js
exports.gridfs = {
  enable: true,
  package: 'egg-gridfs',
};
```

## Configuration

```js
// {app_root}/config/config.default.js
exports.gridfs = {
  client: {
    uri: 'mongodb://127.0.0.1:12017',
    dbName: 'dataDb',
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      authSource: 'admin',
      auth: {
        user: 'username',
        password: 'password',
      },
      // poolSize: 2,
      // ssl: true,
      // replicaSet: 'xxx',
    },
    fileDbName: 'fileDb',
    // fileOptions: {
    //   bucketName: 'test',
    //   chunkSizeBytes: 261120,
    // },
  },
};
```

see [config/config.default.js](config/config.default.js) for more detail.

## Example

- use MongoDB GridFS
> More GridFS Api See [GridFSBucket](http://mongodb.github.io/node-mongodb-native/3.6/api/GridFSBucket.html)

```js
const fs = require('fs');
const { ObjectID } = require('mongodb');

// get GridFS handle for database 'fileDb'(config)
const gridfs = this.app.gridfs;
const id = new ObjectID();

// upload file to database 'fileDb'(config).
fs.createReadStream('./upload.txt')
  .pipe(gridfs.openUploadStreamWithId(id, fileName))
  .on('error', function(error) {
    reject(error);
  })
  .on('finish', function() {
    resolve(id);
  });

// download file from database 'fileDb'(config).
gridfs.openDownloadStream(new ObjectID(id))
  .pipe(fs.createWriteStream('./download.txt'))
  .on('error', function(error) {
    assert.ifError(error);
  })
  .on('end', function() {
    console.log('done!');
    process.exit(0);
  });
```

## Questions & Suggestions

Please open an issue [here](https://github.com/elixirChain/egg-gridfs/issues).

## License

[MIT](LICENSE)
