
module.exports = function(sns) {
  return function(instr) {
    switch(instr.type) {
      case 'publish': return sns.publish(instr.params).promise();
    }
  };
};