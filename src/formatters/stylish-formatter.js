import isPlainObject from 'lodash/isPlainObject.js';

const SPACE = ' ';
const STANDARD_SPACES_NUM = 2;
const NEXT_LEVEL_SPACE = 4;

const INDENT = SPACE.repeat(NEXT_LEVEL_SPACE);
const MIN_INDENT = SPACE.repeat(STANDARD_SPACES_NUM);

const ADDED_SYMBOL = '+ ';
const DELETED_SYMBOL = '- ';

const setSpaces = (depth) => {
  if (depth === 0) return SPACE.repeat(STANDARD_SPACES_NUM);
  return SPACE.repeat(STANDARD_SPACES_NUM + depth * NEXT_LEVEL_SPACE);
};

const arrayToSting = (arr) => JSON.stringify(arr).replace(/"/g, '').split(',').join(', ');

const primitiveToString = (value) => (typeof value === 'undefined' ? '' : String(value));

const stringify = (node, depth) => {
  if (Array.isArray(node)) {
    return arrayToSting(node);
  }
  if (!isPlainObject(node)) {
    return primitiveToString(node);
  }

  const spaces = setSpaces(depth);

  const result = Object.entries(node).reduce((acc, [key, value]) => {
    if (isPlainObject(value)) {
      return [...acc, `  ${spaces}${key}: ${stringify(value, depth + 1)}`];
    }
    return [...acc, `  ${spaces}${key}: ${value}`];
  }, ['{']);

  return [...result, `  ${setSpaces(depth - 1)}}`].join('\n');
};

const makeString = (obj, sign, depth, key = 'value') => {
  const spaces = INDENT.repeat(depth).slice(2);
  return `${spaces}${sign}${obj.key}: ${stringify(obj[key], depth)}`;
};

const format = (node, depth = 1) => node.map((obj) => {
  switch (obj.type) {
    case 'added':
      return makeString(obj, ADDED_SYMBOL, depth);
    case 'deleted':
      return makeString(obj, DELETED_SYMBOL, depth);
    case 'changed': {
      const value1 = makeString(obj, DELETED_SYMBOL, depth, 'value');
      const value2 = makeString(obj, ADDED_SYMBOL, depth, 'value2');
      return `${value1}\n${value2}`;
    }
    case 'nested': {
      const spaces = INDENT.repeat(depth);
      const children = format(obj.children, depth + 1);
      return `${spaces}${obj.key}: ${['{', ...children, `${spaces}}`].join('\n')}`;
    }
    default:
      return makeString(obj, MIN_INDENT, depth);
  }
});

const stylish = (data) => ['{', ...format(data), '}'].join('\n');

export default stylish;
