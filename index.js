const hash = require('./lib/promise-hash');

if (Promise) Promise.hash = hash

module.exports = hash
