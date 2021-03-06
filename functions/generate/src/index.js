const generate = require('./gen.js');
const redeploy = require('s3-redeploy');

exports.handle = async function(e) {
  await generate();
  
  await redeploy({
    bucket: 'wilbur.dog',
    cwd: '/tmp/_site',
    noRm: true
  })
};