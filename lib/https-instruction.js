const Instruction = require('./instruction.js');

function Https(type) {
  return class extends Instruction {
    constructor(params) {
      super(type);
      this.service = 'https';
      this.params = params;
    }
  }
}

const GetResponse = Https('getResponse');

exports.GetResponse = GetResponse;