'use strict';

Promise.hash = function(iteratable) {
  return new Promise((resolve, reject) => {
    const result = {};
    const promiseCount = Object.keys(iteratable).length;
    let cursor = 0;

    for (const promise in iteratable) {
      iteratable[promise].then(promiseResult => {
        result[promise] = promiseResult;
        cursor++;

        if (cursor >= promiseCount) return resolve(result);
      }).catch(reject);
    }
  });
};
