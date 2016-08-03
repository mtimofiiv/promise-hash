'use strict';

const expect = require('chai').expect;

require('../lib/promise-hash');

function dummyPromise(value) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, 1, value);
  });
}

describe('promise-hash library', () => {

  it('Promise#hash() method is polyfilled', () => {
    expect(Promise).to.have.property('hash');
  });

  it('Promise#hash() returns a standard Promise object', () => {
    const promises = {
      one: dummyPromise('promises.one')
    };

    expect(Promise.hash(promises)).to.be.instanceof(Promise);
  });

  it('Promise#hash() to resolve a hash of promises', (done) => {
    const promises = {
      one: dummyPromise('promises.one'),
      two: dummyPromise('promises.two'),
      three: dummyPromise('promises.three'),
      four: dummyPromise('promises.four')
    };

    Promise.hash(promises).then((results) => {
      expect(results).to.have.property('one');
      expect(results.one).to.equal('promises.one');

      expect(results).to.have.property('two');
      expect(results.two).to.equal('promises.two');

      expect(results).to.have.property('three');
      expect(results.three).to.equal('promises.three');

      expect(results).to.have.property('four');
      expect(results.four).to.equal('promises.four');

      done();
    });
  });

});
