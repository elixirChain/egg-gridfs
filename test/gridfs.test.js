'use strict';

const mock = require('egg-mock');

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

  it('should not be undefined', async () => {
    // const gridfs = app.gridfs;
    const gridfs = app.mongo.gridfs;
    const db = app.mongo.db;
    console.log(gridfs);
    console.log(db);

    console.log(app.mongo.ObjectID);
  });

});
