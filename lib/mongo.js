'use strict';

const { EventEmitter } = require('events');
const crypto = require('crypto');
const { PassThrough } = require('stream');
const { MongoClient, GridFSBucket, ObjectID } = require('mongodb');

// create MongoDB connection instance
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
      .then(client => {
        this.client = client;
        this.db = client.db(this.config.dbName);
        this.gridfs = new GridFSBucket(client.db(this.config.fileDbName), this.config.fileOptions);

        this.emit('connect');
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

  /**
   * upload file
   * - keep only one copy of file use 'uploadOnly'
   * @see http://mongodb.github.io/node-mongodb-native/3.6/api/GridFSBucket.html#find
   * @see https://stackoverflow.com/questions/19553837/node-js-piping-the-same-readable-stream-into-multiple-writable-targets
   * @param {object} fileStream file stream
   * @return {string} file_id
   */
  async upload(fileStream) {
    const file_name = fileStream.filename;
    const id = new this.ObjectID();
    return new Promise((resolve, reject) => {
      fileStream.pipe(this.gridfs.openUploadStreamWithId(id, file_name))
        .on('error', function(error) {
          reject(error);
        })
        .on('finish', function() {
          resolve({
            file_id: id,
            file_name,
          });
        });
    });
  }

  /**
   * check duplicate before upload
   * - too slow for big file
   * @param {Object} fileStream file stream
   */
  async uploadOnly(fileStream) {
    // duplicate stream
    const checkStream = new PassThrough();
    const uploadStream = new PassThrough();
    fileStream.pipe(checkStream);
    fileStream.pipe(uploadStream);

    // calculate md5 of file stream
    const hash = crypto.createHash('MD5');
    const md5Str = await new Promise(resolve => {
      checkStream.on('data', chunk => {
        hash.update(chunk);
      });
      checkStream.on('end', () => {
        resolve(hash.digest('hex'));
      });
    });
    // find the latest file that match md5 value, if exists, return it
    const retList = await this.gridfs.find({ md5: md5Str }, { sort: { uploadDate: -1 }, limit: 1 }).toArray();
    if (!!retList && retList.length > 0) {
      return {
        file_id: retList[0]._id,
        file_name: retList[0].filename,
        msg: 'file existed.',
      };
    }

    // or upload a new file
    const file_name = fileStream.filename;
    const id = new this.ObjectID();
    const file_id = await new Promise((resolve, reject) => {
      uploadStream.pipe(this.gridfs.openUploadStreamWithId(id, file_name))
        .on('error', function(error) {
          reject(error);
        })
        .on('finish', function() {
          resolve(id);
        });
    });
    return { file_id, file_name };
  }

  // download a file by the file _id
  async download(id) {
    return this.gridfs.openDownloadStream(new this.ObjectID(id));
  }

}

module.exports = { default: Mongo };
