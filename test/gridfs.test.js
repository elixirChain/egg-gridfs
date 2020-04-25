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
});
