(function (root, factory) {
   if(typeof module === "object" && module.exports) {
    // Scenario where plain modules depend on CommonJS
    // *and* I happen to be loading in a CJS browser environment
    module.exports = factory(root.hash);
  }
  else {
    root.hash = factory(root.hash);
  }
}(this, function(hash) {

  'use strict';

  hash = hash || function (hashOfPromises) {
    const keys = Object.keys(hashOfPromises);
    return Promise.all(keys.map(function (key) {
      return hashOfPromises[key];
    })).then(function (list) {
      return list.reduce(function (hashOfResolved, value, i) {
        hashOfResolved[keys[i]] = value;
        return hashOfResolved;
      }, {});
    });
  };

  if (Promise) Promise.hash = hash

  return hash;
}));
