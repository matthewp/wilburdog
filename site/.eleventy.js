const AWS = require('aws-sdk');
const path = require('path');
const s3 = new AWS.S3({apiVersion: '2006-03-01'});
const memoize = require('fast-memoize')

const getAllPhotos = memoize(async function() {
  let p;

  p = s3.listObjectsV2({
    Bucket: 'wilbur.dog',
    Prefix: 'album/'
  }).promise();
  let result = await p;

  let contents = result.Contents;
  p = Promise.all(contents.filter(c => c.Key !== 'album/').map(async cont => {
    let params = {
      Bucket: 'wilbur.dog',
      Key: cont.Key
    };
    let pp = s3.headObject(params).promise();
    let head = await pp;

    cont.head = head;
    cont.caption = head.Metadata.caption;
    cont.url = `https://wilbur.dog/${cont.Key}`;

    return cont;
  }));
  let items = await p;

  return items;
});

module.exports = function(eleventyConfig) {
  eleventyConfig.setTemplateFormats([ 'md', 'njk' ]);
  eleventyConfig.addPassthroughCopy('site/css');
  eleventyConfig.addPassthroughCopy('site/js');
  eleventyConfig.addPassthroughCopy('site/images');
  eleventyConfig.addPassthroughCopy('site/fonts');

  eleventyConfig.addFilter('relUrl', (url, pageUrl) => {
    if(pageUrl.endsWith('.html')) {
      pageUrl = path.dirname(pageUrl);
    }
    let rel = path.relative(pageUrl, url);
    if(rel[0] !== '.') rel = './' + rel;
    return rel;
  });

  eleventyConfig.addCollection('photos', async function() {
    return await getAllPhotos();
  });

  eleventyConfig.addCollection('recentPhotos', async function() {
    let all = await getAllPhotos();
    let recent = all.slice(0, 20);

    console.log('got', recent.length, 'photos');

    debugger;

    return recent;
  });

  /*
  eleventyConfig.addFilter('formatDate', date => {
    let monthName = monthNames[date.getUTCMonth()];
    let day = date.getUTCDate();
    let year = date.getUTCFullYear();

    return `${monthName} ${day}, ${year}`;
  });
  */
};