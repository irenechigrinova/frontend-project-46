import { isObject } from '../helpers.js';

const setValue = (value) => {
  if (isObject(value) || Array.isArray(value)) return '[complex value]';
  if (typeof value === 'string') return `'${value}'`;
  return value;
};

const setPath = (item, path, nextItemLevel) => {
  if (item.level === 0) return [item.key];
  if (item.type === 'nested' && !path.includes(item.key)) {
    return [...path, item.key];
  }
  if (nextItemLevel < item.level) return path.filter((_item, index) => index < path.length - 1);

  return path;
};

export default (diffTree) => diffTree.reduce((result, item, index) => {
  const value1 = setValue(item.value);
  const value2 = setValue(item.value2);
  const propName = item.level > 0 ? `${result.currentPath.join('.')}.${item.key}` : item.key;
  const nextItemLevel = diffTree[index + 1]?.level ?? null;
  const currentPath = setPath(item, result.currentPath, nextItemLevel);

  if (item.type === 'changed') {
    return {
      ...result,
      strings: [...result.strings, `Property '${propName}' was updated. From ${value1} to ${value2}`],
      currentPath,
    };
  } if (item.type === '+') {
    return {
      ...result,
      strings: [...result.strings, `Property '${propName}' was added with value: ${value1}`],
      currentPath,
    };
  } if (item.type === '-') {
    return {
      ...result,
      strings: [...result.strings, `Property '${propName}' was removed`],
      currentPath,
    };
  }
  return { ...result, currentPath };
}, { strings: [], currentPath: [] }).strings.join('\n');
