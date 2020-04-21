const createExecutor = require('./executor.js');
const db = require('../lib/connect-db')();
const handle = require('./handle.js');
const s3 = require('../lib/connect-s3.js')();
const sns = require('../lib/connect-sns.js')();

const executor = createExecutor(db, s3, sns);

exports.handle = handle.bind(null, executor);