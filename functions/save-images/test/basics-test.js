const tap = require('tap');
const handle = require('../src/handle.js');

function noService(instr) {
  throw new Error(`Service [${instr.service}] not supported.`);
}

tap.test('Basics', async t => {
  function executor(instr) {
    debugger;
    const nosvc = noService.bind(null, instr);
    switch(instr.service) {
      case 'dynamodb': {
        switch(instr.type) {
          case 'getItem': {
            return { token: 'ABC' };
          }
          default: nosvc();
        }
      }
      case 'https': {
        switch(instr.type) {
          case 'getResponse': {
            return {
              headers: {}
            };
          }
          default: nosvc();
        }
      }
      case 'instagram': {
        switch(instr.type) {
          case 'userMedia': {
            return {
              paging: {},
              data: [
                {
                  id: '1',
                  media_url: 'localhost/1',
                  timestamp: (new Date()).toString(),
                  caption: 'some caption'
                }
              ]
            };
          }
          default: nosvc();
        }
      }
      case 's3': {
        switch(instr.type) {
          case 'headObject': return undefined;
          case 'upload': return true;
          default: nosvc();
        }
      }
      case 'sns': {
        switch(instr.type) {
          case 'publish': {
            return true;
          }
        }
      }
      default: nosvc();
    }
  }

  await handle(executor);

  t.end();
})