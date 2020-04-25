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
};
```

see [config/config.default.js](config/config.default.js) for more detail.

## Example

<!-- example here -->

## Questions & Suggestions

Please open an issue [here](https://github.com/eggjs/egg/issues).

## License

[MIT](LICENSE)
