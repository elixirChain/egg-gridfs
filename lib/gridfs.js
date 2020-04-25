'use strict';

const Mongo = require('./mongo').default;

module.exports = app => {
  // [!!!NEED be same with the config, e.g. mongo{client{config}}]
  app.addSingleton('mongo', createMongo);
};

async function createMongo(config, app) {
  const mongoInstance = new Mongo(config);
  await mongoInstance.connect();

  mongoInstance.on('connect', () => {
    app.coreLogger.info(`[egg-gridfs] connect mongodb[${config.uri}] success.`);
  });
  mongoInstance.on('error', error => {
    app.coreLogger.error(`[egg-gridfs] connect mongodb[${config.uri}] error:`, error);
  });

  app.beforeStart(async () => {
    app.coreLogger.info('[egg-gridfs] connecting mongodb...');
  });

  // return mongoInstance.gridfs;
  // return mongoInstance.db;
  return mongoInstance;
}
