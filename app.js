'use strict';

module.exports = app => {
  // use addSingleton load to app
  require('./lib/gridfs')(app);
};
