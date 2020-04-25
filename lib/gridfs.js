'use strict';

const assert = require('assert');
const { MongoClient, GridFSBucket } = require('mongodb');

module.exports = app => {
  // [!!!NEED be same with the config, e.g. gridfs{client{config}}]
  app.addSingleton('gridfs', createGridfs);
};

async function createGridfs(config, app) {
  assert(config.uri, `[egg-gridfs] 'url: ${config.uri}' must be configured!`);
  assert(config.fileDbName, `[egg-gridfs] 'fileDbName: ${config.fileDbName}' must be configured!`);
  app.coreLogger.info('[egg-gridfs] connecting %s with options: %s', config.uri, config.options);

  // [CASE ONE]
  const client = await MongoClient.connect(config.uri, config.options)
    .then(function(client) {
      return client;
    })
    .catch(function(err) {
      app.coreLogger.error('------ connecting mongo database error: ', err);
    });
  return new GridFSBucket(client.db(config.fileDbName), config.fileOptions);

  // [CASE TWO]
  // const client = new MongoClient(config.uri, config.options);
  // client.connect(function(err) {
  //   if (!!err) {
  //     console.error('------ connecting mongo database error: ', err);
  //   }
  // });
  // return new GridFSBucket(client.db(config.fileDbName), config.fileOptions);
}
