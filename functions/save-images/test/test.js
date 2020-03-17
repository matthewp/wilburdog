const Setting = require('../lib/models/setting');

let setting = new Setting();
let instr = Setting.get('wilbur');

console.log(instr.params);