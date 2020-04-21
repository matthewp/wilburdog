const https = require('https');

module.exports = function() {
  return function(instr) {
    switch(instr.type) {
      case 'request': {
        return request(instr.params.url);
      }
      case 'userMedia': {
        let { fields, token } = instr.params;
        let url = `https://graph.instagram.com/me/media?fields=${fields}&access_token=${token}`;
        return request(url);
      }
      case 'refreshToken': {
        let { token } = instr.params;
        let url = `https://graph.instagram.com/refresh_access_token?grant_type=ig_refresh_token&access_token=${token}`;
        return request(url);
      }
    }
  };
};

function request(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let status = res.statusCode;
      let data = '';
  
      res.on('data', (d) => {
        data += d;
      });

      res.on('end', () => {
        if(status !== 200) {
          let err;
          try {
            err = JSON.parse(data);
            err.status = status;
            err.url = url;
          } catch(_) {
            err = {
              status, url, message: data
            };
          }
          reject(err);
        } else {
          resolve(JSON.parse(data));
        }
      });
  
    }).on('error', (e) => {
      reject(e);
    });
  });
}
