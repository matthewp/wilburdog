const { GetItem, DeleteItem, PutItem, UpdateItem, Query } = require('../db-instruction.js');
const { type } = require('@matthewp/lon');

module.exports = function(tableName) {
  return class extends type(tableName) {
    static get(...args) {
      return new GetItem(super.get(...args));
    }

    static query(...args) {
      return new Query(super.query(...args));
    }

    static get tableName() {
      return tableName;
    }

    update(...args) {
      return new UpdateItem(super.update(...args));
    }

    save(...args) {
      return new PutItem(super.save(...args));
    }

    delete(...args) {
      return new DeleteItem(super.delete(...args));
    }
  };
};