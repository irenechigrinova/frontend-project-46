import { isObject } from '../helpers.js';

const setValue = (value) => {
  if (isObject(value) || Array.isArray(value)) return '[complex value]';
  if (typeof value === 'string') return `'${value}'`;
  return value;
};

export default (diffTree) => {
  let currentPath = [];

  return diffTree.reduce((result, item, index) => {
    if (item.level === 0) currentPath = [item.key];

    const value1 = setValue(item.value);
    const value2 = setValue(item.value2);
    const propName = item.level > 0 ? `${currentPath.join('.')}.${item.key}` : item.key;
    const nextItemLevel = diffTree[index + 1]?.level ?? null;

    if (item.type === 'nested' && !currentPath.includes(item.key)) {
      currentPath.push(item.key);
    } else if (item.type === 'changed') {
      result.push(`Property '${propName}' was updated. From ${value1} to ${value2}`);
    } else if (item.type === '+') {
      result.push(`Property '${propName}' was added with value: ${value1}`);
    } else if (item.type === '-') {
      result.push(`Property '${propName}' was removed`);
    }
    if (nextItemLevel < item.level) {
      currentPath.pop();
    }
    return result;
  }, []).join('\n');
};
