const Instruction = require('./instruction.js');

function SNS(type) {
  return class extends Instruction {
    constructor(params) {
      super(type, params);
      this.service = 'sns';
    }
  }
}

const Publish = SNS('publish');

exports.Publish = Publish;