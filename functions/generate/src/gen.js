const Eleventy = require('@11ty/eleventy');

async function run() {
  let elev = new Eleventy('site', '/tmp/_site');
  elev.setConfigPathOverride('site/.eleventy.js')
  await elev.init();
  await elev.write();
}

module.exports = run;