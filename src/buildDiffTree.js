import uniq from 'lodash/uniq.js';
import sortBy from 'lodash/sortBy.js';
import isPlainObject from 'lodash/isPlainObject.js';

const getKeys = (obj1, obj2) => sortBy(uniq([...Object.keys(obj1), ...Object.keys(obj2)]));

const buildDiffTree = (obj1, obj2) => {
  const keys = getKeys(obj1, obj2);

  return keys.map((key) => {
    const value1 = obj1[key];
    const value2 = obj2[key];

    switch (true) {
      case value1 === value2:
        return { key, value: value1, type: 'none' };

      case isPlainObject(value1) && isPlainObject(value2):
        return {
          key,
          value: null,
          type: 'nested',
          children: buildDiffTree(value1, value2),
        };

      case typeof value1 !== 'undefined' && typeof value2 !== 'undefined':
        return {
          key, value: value1, value2, type: 'changed',
        };

      default:
        return {
          key, value: value1 ?? value2, type: typeof value1 !== 'undefined' ? 'deleted' : 'added',
        };
    }
  });
};

export default buildDiffTree;
