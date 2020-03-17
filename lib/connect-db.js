const AWS = require('aws-sdk');
const dbOpts = require('./db.js');

module.exports = function(loadConfig){
  const ddb = new AWS.DynamoDB({
    apiVersion: '2012-08-10',
    region: 'us-west-2'
  });
  const db = dbOpts.bind(ddb);
  return db;
};
