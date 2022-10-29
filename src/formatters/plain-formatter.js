import isPlainObject from 'lodash/isPlainObject.js';

const setValue = (value) => {
  if (isPlainObject(value) || Array.isArray(value)) return '[complex value]';
  if (typeof value === 'string') return `'${value}'`;
  return value;
};

const plain = (content, path = '') => content.reduce((result, obj) => {
  switch (obj.type) {
    case 'added':
      return [...result, `Property '${path}${obj.key}' was added with value: ${setValue(obj.value)}`];
    case 'deleted':
      return [...result, `Property '${path}${obj.key}' was removed`];
    case 'changed':
      return [...result, `Property '${path}${obj.key}' was updated. From ${setValue(obj.value)} to ${setValue(obj.value2)}`];
    case 'nested':
      return [...result, plain(obj.children, `${path}${obj.key}.`)];
    default:
      return result;
  }
}, []).filter((row) => !!row.length).join('\n');

export default plain;
