const AWS = require('aws-sdk');

module.exports = function(){
  const sns = new AWS.SNS({
    apiVersion: '2010-03-31',
    region: 'us-west-2'
  });
  return sns;
};
