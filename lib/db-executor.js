
module.exports = function(db) {
  return function(instr) {
    switch(instr.type) {
      case 'getItem': return db.getItem(instr.params);
      case 'putItem': return db.putItem(instr.params);
      case 'query': return db.query(instr.params);
      case 'updateItem': return db.updateItem(instr.params);
      case 'deleteItem': return db.deleteItem(instr.params);
      case 'scan': return db.scan(instr.params);
    }
  };
};