const createDBExecutor = require('../lib/db-executor.js');
const createHttpsExecutor = require('../lib/https-executor.js');
const createInstagramExecutor = require('../lib/instagram-executor.js');
const createS3Executor = require('../lib/s3-executor.js');
const createSNSExecutor = require('../lib/sns-executor.js');

module.exports = function(db, s3, sns) {
  const dbExecutor = createDBExecutor(db);
  const instagramExecutor = createInstagramExecutor();
  const httpsExecutor = createHttpsExecutor();
  const s3Executor = createS3Executor(s3);
  const snsExecutor = createSNSExecutor(sns);

  return function(instr) {
    switch(instr.service) {
      case 'dynamodb': {
        return dbExecutor(instr);
      }
      case 'https': {
        return httpsExecutor(instr);
      }
      case 'instagram': {
        return instagramExecutor(instr);
      }
      case 's3': {
        return s3Executor(instr);
      }
      case 'sns': {
        return snsExecutor(instr);
      }
      default: {
        throw new Error(`Service [${instr.service}] not supported.`);
      }
    }
  };
};