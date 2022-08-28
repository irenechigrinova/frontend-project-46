import { isObject } from '../helpers.js';

const setValue = (value) => {
  if (isObject(value) || Array.isArray(value)) return '[complex value]';
  if (typeof value === 'string') return `'${value}'`;
  return value;
};

export default (diffTree) => {
  const currentPath = [];

  return diffTree.reduce((result, item, index) => {
    if (item.level === 0) {
      currentPath.length = 0;
      currentPath[0] = item.key;
    }

    const value1 = setValue(item.value);
    const value2 = setValue(item.value2);
    const propName = item.level > 0 ? `${currentPath.join('.')}.${item.key}` : item.key;
    const nextItemLevel = diffTree[index + 1]?.level ?? null;

    if (item.type === 'nested' && !currentPath.includes(item.key)) {
      currentPath[currentPath.length] = item.key;
    }
    if (nextItemLevel < item.level) {
      currentPath.length -= 1;
    }
    if (item.type === 'changed') {
      return [...result, `Property '${propName}' was updated. From ${value1} to ${value2}`];
    } if (item.type === '+') {
      return [...result, `Property '${propName}' was added with value: ${value1}`];
    } if (item.type === '-') {
      return [...result, `Property '${propName}' was removed`];
    }
    return result;
  }, []).join('\n');
};
