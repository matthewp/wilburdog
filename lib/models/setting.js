const model = require('./model.js');
const TABLE_NAME = 'wilburdog';

class Setting extends model(TABLE_NAME) {
  static get key() {
    return 'id';
  }
}

module.exports = Setting;