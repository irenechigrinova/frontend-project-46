import { isObject, sortStrings, uniq } from './helpers.js';

const getKeys = (obj1, obj2) => uniq([...Object.keys(obj1), ...Object.keys(obj2)])
  .sort(sortStrings);

export default (content1, content2) => {
  function buildFlatTree(obj1, obj2, level) {
    const keys = getKeys(obj1, obj2);

    return keys.reduce((acc, key) => {
      if (obj1[key] === obj2[key]) {
        acc.push({
          key, value: obj1[key], level, type: 'none',
        });
      } else if (isObject(obj1[key]) && isObject(obj2[key])) {
        acc.push({
          key,
          value: null,
          level,
          type: 'nested',
        }, ...buildFlatTree(obj1[key], obj2[key], level + 1));
      } else if (typeof obj1[key] !== 'undefined' && typeof obj2[key] !== 'undefined') {
        acc.push({
          key, value: obj1[key], value2: obj2[key], type: 'changed', level,
        });
      } else {
        acc.push({
          key, value: obj1[key] ?? obj2[key], type: typeof obj1[key] !== 'undefined' ? '-' : '+', level,
        });
      }
      return acc;
    }, []);
  }

  return buildFlatTree(content1, content2, 0);
};
