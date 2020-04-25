'use strict';

const { EventEmitter } = require('events');
const { MongoClient, GridFSBucket, ObjectID } = require('mongodb');

// MongoDB 连接类
class Mongo extends EventEmitter {
  constructor(config) {
    super();
    this.config = config;

    this.client;
    this.db;
    this.gridfs;

    this.ObjectID = ObjectID;
  }

  connect() {
    return MongoClient.connect(this.config.uri, this.config.options)
      // .then(client => {
      .then(async client => {
        this.client = client;
        this.db = client.db(this.config.dbName);
        this.gridfs = new GridFSBucket(client.db(this.config.fileDbName), this.config.fileOptions);

        this.emit('connect');
        return client;
      })
      .catch(error => {
        this.emit('error', error);
        throw error;
      });
  }

  close() {
    this.emit('close');
    return this.client.close();
  }

}

module.exports = { default: Mongo };