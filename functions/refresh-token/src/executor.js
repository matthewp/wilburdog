const createDBExecutor = require('../lib/db-executor.js');
const createInstagramExecutor = require('../lib/instagram-executor.js');

module.exports = function(db) {
  const dbExecutor = createDBExecutor(db);
  const instagramExecutor = createInstagramExecutor();

  return function(instr) {
    switch(instr.service) {
      case 'dynamodb': {
        return dbExecutor(instr);
      }
      case 'instagram': {
        return instagramExecutor(instr);
      }
      default: {
        throw new Error(`Service [${instr.service}] not supported.`);
      }
    }
  };
};