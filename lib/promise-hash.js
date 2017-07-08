'use strict';

Promise.hash = Promise.hash || function (hashOfPromises) {
  let keys = Object.keys(hashOfPromises);
  return Promise.all(keys.map(function (key) {
    return hashOfPromises[key];
  })).then(function (list) {
    return list.reduce(function (hashOfResolved, value, i) {
      hashOfResolved[keys[i]] = value;
      return hashOfResolved;
    }, {});
  });
};
