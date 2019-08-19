const assert = require('assert')

// non-polyfill version
const hash = require('../lib/promise-hash')
// polyfill version
require('../index')

const dummyPromise = value => new Promise((resolve, reject) => {
  setTimeout(resolve, 1, value)
})

const run = async () => {
  console.log('=> Running test suite for npm module `promise-hash`...')

  console.info('=> Promise#hash() method is polyfilled')
  assert(Promise.hash)

  console.info('=> Promise#hash() returns a standard Promise object')
  const promises1 = { one: dummyPromise('promises.one') }
  assert(Promise.hash(promises1) instanceof Promise)

  console.info('=> Promise#hash() to resolve a hash of promises')
  const promises2 = {
    one: dummyPromise('promises.one'),
    two: dummyPromise('promises.two'),
    three: dummyPromise('promises.three'),
    four: dummyPromise('promises.four')
  }

  const results2 = await Promise.hash(promises2)
  assert.deepStrictEqual(results2, {
    one: 'promises.one',
    two: 'promises.two',
    three: 'promises.three',
    four: 'promises.four'
  })

  console.info('=> Promise#hash() non-polyfill === polyfill function')
  assert.deepStrictEqual(Promise.hash, hash)
}

run().then(() => {
  console.log('=> Suite run complete, no problems!')
  process.exit()
}).catch(error => {
  console.error(error)
  process.exit(2)
})
