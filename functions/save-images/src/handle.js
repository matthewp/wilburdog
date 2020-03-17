const instagramAPI = require('./instagram.js');
const Setting = require('../lib/models/setting');
const { Publish } = require('../lib/sns-instruction.js');

const SNS_TOPIC = 'arn:aws:sns:us-west-2:891517687447:wilburdog_regenerate';

module.exports = async function(executor){
  let setting = await executor(Setting.get('wilbur'));

  let instagram = Object.create(instagramAPI, {
    token: {
      enumerable: true,
      value: setting.token
    }
  });

  let addedCount = await instagram.sync(executor);

  if(addedCount > 0) {
    await executor(new Publish({
      Message: 'regenerate',
      TopicArn: SNS_TOPIC
    }));
  }
};