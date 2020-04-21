const { handle } = require('../src/index.js');

async function run() {
  await handle();
}

run().catch(err => {
  console.error(err);
});