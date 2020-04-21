const Instruction = require('./instruction.js');

function S3(type) {
  return class extends Instruction {
    constructor(params) {
      super(type, params);
      this.service = 's3';
    }
  }
}

const ListObjects = S3('listObjects');
const HeadObject = S3('headObject');
const Upload = S3('upload');

exports.ListObjects = ListObjects;
exports.HeadObject = HeadObject;
exports.Upload = Upload;