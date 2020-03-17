const { InstagramRequest, UserMedia } = require('../lib/instagram-instruction.js');
const { HeadObject, Upload } = require('../lib/s3-instruction.js');
const { GetResponse } = require('../lib/https-instruction.js');

const BUCKET = 'wilbur.dog';
const mediaFields = ['id', 'caption', 'media_url', 'timestamp'].join(',');

async function upload(executor, media) {
  let {
    media_url: url,
    media_type: type,
    id, timestamp, caption
  } = media;

  let res = await executor(new GetResponse({ url }));

  let stream = res;
  let headers = res.headers;
  let uinstr = new Upload({
    Bucket: BUCKET,
    Key: `album/${id}`,
    Body: stream,
    ContentType: headers['content-type'],
    Metadata: {
      'caption': encodeURIComponent(caption),
      'created': timestamp
    }
  });

  return await executor(uinstr);
}

async function processMedia(executor, m) {
  let key = `album/${m.id}`;
  try {
    let head = await executor(new HeadObject({
      Bucket: BUCKET,
      Key: key
    }));

    if(head) {
      return false;
    }
  } catch(_) {
    // Doesn't exist, proceed.
  }
  
  await upload(executor, m);
  return true;
}

async function sync(executor) {
  let newImages = 0;
  let result = await executor(new UserMedia({
    fields: mediaFields,
    token: this.token
  }));

  while(true) {
    let nextUrl = result.paging.next;
    let proceed = true;

    let data = result.data || [];
    for(let m of data) {
      let saved = await processMedia(executor, m);

      // Nothing was saved because it already was, can skip ahead.
      if(!saved) {
        proceed = false;
        break;
      } else {
        newImages++;
      }
    }

    if(!proceed || !nextUrl) {
      break;
    }

    result = await executor(new InstagramRequest({ url: nextUrl }));
  }

  return newImages;
}

exports.sync = sync;