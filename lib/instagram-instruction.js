const Instruction = require('./instruction.js');

function Instagram(type) {
  return class extends Instruction {
    constructor(params) {
      super(type);
      this.service = 'instagram';
      this.params = params;
    }
  }
}

const InstagramRequest = Instagram('request');
const UserMedia = Instagram('userMedia');
const RefreshToken = Instagram('refreshToken');

exports.InstagramRequest = InstagramRequest;
exports.RefreshToken = RefreshToken;
exports.UserMedia = UserMedia;