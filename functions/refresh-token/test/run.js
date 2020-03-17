const createExecutor = require('../src/executor.js');
const db = require('../lib/connect-db')();
const handle = require('../src/handle.js');

const executor = createExecutor(db);

async function run() {
  debugger;
  await handle(executor);
}

run().catch(err => console.error(err));