const Instruction = require('./instruction.js');

function DB(type) {
  return class extends Instruction {
    constructor(builder) {
      super(type);
      this.builder = builder;
      this.service = 'dynamodb';
    }

    get params() {
      return this.builder.params();
    }

    set params(v) {}
  }
}

const GetItem = DB('getItem');
const PutItem = DB('putItem');
const DeleteItem = DB('deleteItem');
const Query = DB('query');
const UpdateItem = DB('updateItem');

exports.GetItem = GetItem;
exports.PutItem = PutItem;
exports.DeleteItem = DeleteItem;
exports.Query = Query;
exports.UpdateItem = UpdateItem;