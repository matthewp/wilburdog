const { RefreshToken } = require('../lib/instagram-instruction.js');
const Setting = require('../lib/models/setting');

module.exports = async function(executor) {
  debugger;
  let setting = await executor(Setting.get('wilbur'));

  let result = await executor(new RefreshToken({
    token: setting.token
  }));

  setting.token = result.access_token;
  setting.expiresIn = result.expires_in;
  setting.tokenUpdated = (new Date()).toISOString();

  await executor(new Setting(setting).save());
};