module.exports = function() {
  return function(instr) {
    switch(instr.type) {
      case 'getresponse': {
        return getResponse(instr.params.url);
      }
    }
  };
};

function getResponse(url) {
  return new Promise(resolve => {
    https.get(url, (res) => {
      resolve(res);
    });
  })
}
