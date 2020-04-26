'use strict';

const mock = require('egg-mock');
const assert = require('assert');

describe('test/gridfs.test.js', () => {
  let app;
  before(() => {
    app = mock.app({
      baseDir: 'apps/gridfs-test',
    });
    return app.ready();
  });

  after(() => app.close());
  afterEach(mock.restore);

  it('should GET /', () => {
    return app.httpRequest()
      .get('/')
      .expect('hi, gridfs')
      .expect(200);
  });

  it('should gridfs === GridFSBucket object', () => {
    const gridfs = app.mongo.gridfs;
    assert(gridfs.constructor.name === 'GridFSBucket', 'get gridfs object error');
  });
  it('should db === Db object', () => {
    const db = app.mongo.db;
    assert(db.constructor.name === 'Db', 'get db object error');
  });
  it('should ObjectID === Function object', () => {
    const ObjectID = app.mongo.ObjectID;
    assert(ObjectID.constructor.name === 'Function', 'get ObjectID object error');
  });

});
