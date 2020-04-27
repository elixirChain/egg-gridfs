'use strict';

/**
 * egg-gridfs default config
 * @see http://mongodb.github.io/node-mongodb-native/3.6/tutorials/connect/
 * @member Config#mongo
 * @property {String} SOME_KEY - some description
 */
exports.mongo = {
  client: {
    // uri: 'mongodb://username:password@127.0.0.1:12017?authSource=admin',
    // uri: 'mongodb://127.0.0.1:12017,127.0.0.1:12018',
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
