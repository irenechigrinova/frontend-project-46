import { isObject } from '../helpers.js';

const SPACE = ' ';
const STANDARD_SPACES_NUM = 2;
const NEXT_LEVEL_SPACE = 4;

const setSpaces = (level) => {
  if (level === 0) return SPACE.repeat(STANDARD_SPACES_NUM);
  return SPACE.repeat(STANDARD_SPACES_NUM + level * NEXT_LEVEL_SPACE);
};

const setClosingBracket = (prevLevel, currentLevel) => {
  const result = [];
  for (let i = currentLevel; i > prevLevel; i -= 1) {
    result.push(`  ${setSpaces(i - 1)}}`);
  }
  return result;
};

const primitiveToString = (value) => {
  if (typeof value === 'undefined') return '';
  if (!isObject(value) && !Array.isArray(value)) return value;
  return JSON.stringify(value).replace(/"/g, '').split(',').join(', ');
};

const valueToString = (value, level) => {
  if (!isObject(value)) return primitiveToString(value);

  const spaces = setSpaces(level);

  const result = Object.keys(value).reduce((acc, key) => {
    if (isObject(value[key])) return [...acc, `  ${spaces}${key}: ${valueToString(value[key], level + 1)}`];
    return [...acc, `  ${spaces}${key}: ${value[key]}`];
  }, ['{']);
  result.push(`  ${setSpaces(level - 1)}}`);

  return result.join('\n');
};

export default (diffTree) => {
  const result = ['{'];
  for (let i = 0; i < diffTree.length; i += 1) {
    const currentNode = diffTree[i];
    const nextLevel = diffTree[i + 1]?.level ?? null;
    const spaces = setSpaces(currentNode.level);

    const value1 = valueToString(currentNode.value, currentNode.level + 1);
    const value2 = valueToString(currentNode.value2, currentNode.level + 1);

    if (currentNode.type === 'nested') {
      result.push(`${spaces}  ${currentNode.key}: {`);
    } else if (currentNode.type === 'none') {
      result.push(`${spaces}  ${currentNode.key}: ${value1}`);
    } else if (currentNode.type === 'changed') {
      const bothArrays = Array.isArray(currentNode.value) && Array.isArray(currentNode.value2);
      result.push(`${spaces}${bothArrays ? ' ' : '-'} ${currentNode.key}: ${value1}`);
      result.push(`${spaces}${bothArrays ? ' ' : '+'} ${currentNode.key}: ${value2}`);
    } else {
      result.push(`${spaces}${currentNode.type} ${currentNode.key}: ${value1}`);
    }
    if (nextLevel < currentNode.level) {
      result.push(...setClosingBracket(nextLevel, currentNode.level));
    }
  }
  result.push('}');
  return result.join('\n');
};
