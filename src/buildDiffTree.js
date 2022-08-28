import uniq from 'lodash/uniq.js';
import sortBy from 'lodash/sortBy.js';
import { isObject } from './helpers.js';

const getKeys = (obj1, obj2) => sortBy(uniq([...Object.keys(obj1), ...Object.keys(obj2)]));

export default (content1, content2) => {
  function buildFlatTree(obj1, obj2, level) {
    const keys = getKeys(obj1, obj2);

    return keys.reduce((acc, key) => {
      if (obj1[key] === obj2[key]) {
        return [...acc, {
          key, value: obj1[key], level, type: 'none',
        }];
      } if (isObject(obj1[key]) && isObject(obj2[key])) {
        return [...acc, {
          key,
          value: null,
          level,
          type: 'nested',
        }, ...buildFlatTree(obj1[key], obj2[key], level + 1)];
      } if (typeof obj1[key] !== 'undefined' && typeof obj2[key] !== 'undefined') {
        return [...acc, {
          key, value: obj1[key], value2: obj2[key], type: 'changed', level,
        }];
      }
      return [...acc, {
        key, value: obj1[key] ?? obj2[key], type: typeof obj1[key] !== 'undefined' ? '-' : '+', level,
      }];
    }, []);
  }

  return buildFlatTree(content1, content2, 0);
};
