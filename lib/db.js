const dynamoAttr = require('dynamodb-data-types').AttributeValue;

function putItem(ddb, params) {
  return new Promise(function(resolve, reject){
    ddb.putItem(params, function(err, data) {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
}

function getItem(ddb, params) {
  return new Promise(function(resolve, reject){
    ddb.getItem(params, function(err, data) {
      if (err) {
        reject(err);
      } else {
        let item = data.Item;
        if(item) {
          item = dynamoAttr.unwrap(item);
        }
        resolve(item);
      }
    });
  });
}

function QueryMeta(data) {
  this.count = data.Count;
  this.scannedCount = data.ScannedCount;
}

function query(ddb, params) {
  return new Promise(function(resolve, reject){
    ddb.query(params, function(err, data){
      if(err) {
        reject(err);
      } else {
        let items = data.Items.map(unwrap);
        items.meta = new QueryMeta(data);
        resolve(items);
      }
    })
  })
}

function scan(ddb, params) {
  return new Promise(function(resolve, reject){
    ddb.scan(params, function(err, data) {
      if(err) {
        reject(err);
      } else {
        let items = data.Items.map(unwrap);
        resolve(items);
      }
    });
  });
}

function updateItem(ddb, params) {
  return new Promise(function(resolve, reject) {
    ddb.updateItem(params, function(err, data) {
      if(err) return reject(err);
      resolve(data);
    });
  });
}

function deleteItem(ddb, params) {
  return new Promise(function(resolve, reject) {
    ddb.deleteItem(params, function(err, data) {
      if(err) return reject(err);
      resolve(data);
    });
  })
}

function getParams(tableName, keyObj) {
  let keyParam = wrap(keyObj);
  return {
    TableName: tableName,
    Key: keyParam
  };
}

function putParams(tableName, itemObj, wrapOptions) {
  let itemParam = wrap(itemObj, wrapOptions);
  return {
    TableName: tableName,
    Item: itemParam
  };
}

function queryParams(tableName, itemObj) {
  let itemParam = wrap(itemObj);
  itemParam.TableName = tableName;
  return itemParam;
}

function wrap(obj, wrapOptions) {
  return dynamoAttr.wrap(obj, wrapOptions);
}

function unwrap(obj) {
  return dynamoAttr.unwrap(obj);
}

// Create a module bind to a particular ddb
function bind(ddb) {
  const out = Object.create(null);
  out.putItem = putItem.bind(null, ddb);
  out.getItem = getItem.bind(null, ddb);
  out.updateItem = updateItem.bind(null, ddb);
  out.deleteItem = deleteItem.bind(null, ddb);
  out.query = query.bind(null, ddb);
  out.scan = scan.bind(null, ddb);
  out.getParams = getParams;
  out.putParams = putParams;
  out.queryParams = queryParams;
  out.wrap = wrap;
  out.unwrap = unwrap;
  return out;
}

exports.putItem = putItem;
exports.getItem = getItem;
exports.bind = bind;
exports.scan = scan;
exports.wrap = wrap;
exports.unwrap = unwrap;
exports.getParams = getParams;
exports.putParams = putParams;