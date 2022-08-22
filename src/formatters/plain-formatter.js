import { isObject } from '../helpers.js';

export default (diffTree) => {
  const currentPath = [];

  return diffTree.reduce((result, item, index) => {
    const value1 = isObject(item.value) || Array.isArray(item.value) ? '[complex value]' : `'${item.value}'`;
    const value2 = isObject(item.value2) || Array.isArray(item.value2) ? '[complex value]' : `'${item.value2}'`;
    const propName = item.level > 0 ? `${currentPath.join('.')}.${item.key}` : item.key;
    const nextLevel = diffTree[index + 1]?.level ?? null;

    if (item.type === 'nested') {
      currentPath.push(item.key);
    } else if (item.type === 'changed') {
      result.push(`Property '${propName}' was updated. From ${value1} to ${value2}`);
    } else if (item.type === '+') {
      result.push(`Property '${propName}' was added with value: ${value1}`);
    } else if (item.type === '-') {
      result.push(`Property '${propName}' was removed`);
    }
    if (nextLevel < item.level) {
      currentPath.pop();
    }
    return result;
  }, []).join('\n');
};
