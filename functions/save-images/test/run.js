const { handle } = require('../src/index.js');

handle().catch(err => {
  console.error(err);
});