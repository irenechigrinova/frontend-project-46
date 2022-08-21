import uniq from 'lodash/uniq.js';

import { isObject, sortStrings } from './helpers.js';

export default (content1, content2) => {
  function buildFlatTree(obj1, obj2, level) {
    const keys = uniq([...Object.keys(obj1), ...Object.keys(obj2)])
      .sort(sortStrings);

    return keys.reduce((acc, key) => {
      switch (true) {
        case obj1[key] === obj2[key]:
          acc.push({
            key, value: obj1[key], level, type: 'none',
          });
          break;
        case isObject(obj1[key]) && isObject(obj2[key]):
          acc.push({
            key,
            value: null,
            level,
            type: 'nested',
          }, ...buildFlatTree(obj1[key], obj2[key], level + 1));
          break;
        case typeof obj1[key] !== 'undefined' && typeof obj2[key] !== 'undefined':
          acc.push({
            key,
            value: obj1[key],
            value2: obj2[key],
            type: 'changed',
            level,
          });
          break;
        default:
          acc.push({
            key,
            value: obj1[key] ?? obj2[key],
            type: typeof obj1[key] !== 'undefined' ? '-' : '+',
            level,
          });
      }
      return acc;
    }, []);
  }

  return buildFlatTree(content1, content2, 0);
};
