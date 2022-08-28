import { isObject } from '../helpers.js';

const SPACE = ' ';
const STANDARD_SPACES_NUM = 2;
const NEXT_LEVEL_SPACE = 4;

const setSpaces = (level) => {
  if (level === 0) return SPACE.repeat(STANDARD_SPACES_NUM);
  return SPACE.repeat(STANDARD_SPACES_NUM + level * NEXT_LEVEL_SPACE);
};

const setClosingBracket = (nextLevel, currentLevel) => {
  if (nextLevel >= currentLevel) return [];
  const result = new Array(currentLevel - nextLevel).fill(0);
  return result.map((_, index) => `  ${setSpaces(currentLevel - index - 1)}}`);
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

  return [...result, `  ${setSpaces(level - 1)}}`].join('\n');
};

export default (diffTree) => {
  const result = diffTree.reduce((acc, currentNode, index) => {
    const nextLevel = diffTree[index + 1]?.level ?? null;
    const spaces = setSpaces(currentNode.level);

    const value1 = valueToString(currentNode.value, currentNode.level + 1);
    const value2 = valueToString(currentNode.value2, currentNode.level + 1);

    const closingBrackets = setClosingBracket(nextLevel, currentNode.level);

    if (currentNode.type === 'nested') {
      return [...acc, `${spaces}  ${currentNode.key}: {`, ...closingBrackets];
    } if (currentNode.type === 'none') {
      return [...acc, `${spaces}  ${currentNode.key}: ${value1}`, ...closingBrackets];
    } if (currentNode.type === 'changed') {
      const bothArrays = Array.isArray(currentNode.value) && Array.isArray(currentNode.value2);
      return [
        ...acc,
        `${spaces}${bothArrays ? ' ' : '-'} ${currentNode.key}: ${value1}`,
        `${spaces}${bothArrays ? ' ' : '+'} ${currentNode.key}: ${value2}`,
        ...closingBrackets,
      ];
    }
    return [...acc, `${spaces}${currentNode.type} ${currentNode.key}: ${value1}`, ...closingBrackets];
  }, ['{']);

  return [...result.filter((item) => item !== null), '}'].join('\n');
};
