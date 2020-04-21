const AWS = require('aws-sdk');

module.exports = function(loadConfig){
  const s3 = new AWS.S3({
    apiVersion: '2006-03-01'
  });
  return s3;
};
