const createExecutor = require('./executor.js');
const db = require('../lib/connect-db')();
const handle = require('./handle.js');

const executor = createExecutor(db);

exports.handle = handle.bind(null, executor);