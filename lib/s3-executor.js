
module.exports = function(s3) {
  return function(instr) {
    switch(instr.type) {
      case 'listObjects': return s3.listObjectsV2(instr.params).promise();
      case 'headObject': return s3.headObject(instr.params).promise();
      case 'upload': return s3.upload(instr.params).promise();
    }
  };
};