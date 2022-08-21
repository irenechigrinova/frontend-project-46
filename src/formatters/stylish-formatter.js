import { isObject } from '../helpers.js';

const SPACE = ' ';
const STANDARD_SPACES_NUM = 2;

const setSpaces = (level) => {
  let spaces = SPACE.repeat(STANDARD_SPACES_NUM + level * STANDARD_SPACES_NUM);
  if (level > 0) spaces += SPACE.repeat(STANDARD_SPACES_NUM * level);

  return spaces;
};

const setClosingBracket = (nextLevel, currentLevel) => {
  const result = [];
  for (let i = currentLevel; i > nextLevel; i -= 1) {
    result.push(`  ${setSpaces(i - 1)}}`);
  }
  return result;
};

const valueToString = (value, level) => {
  if (typeof value === 'undefined') return '';
  if (!isObject(value) && !Array.isArray(value)) return value;
  if (Array.isArray(value)) {
    return JSON.stringify(value).replace(/"/g, '').split(',').join(', ');
  }

  const result = Object.keys(value).reduce((acc, key) => {
    const spaces = setSpaces(level + 1);
    if (isObject(value[key])) return [...acc, `${spaces}${key}: ${valueToString(value[key], level + 1)}`];
    return [...acc, `${spaces}${key}: ${value[key]}`];
  }, ['{']);
  result.push(`  ${setClosingBracket(level - 1, level)[0]}`);
  return result.join('\n');
};

export default (diffTree) => {
  const result = ['{'];
  for (let i = 0; i < diffTree.length; i += 1) {
    const currentNode = diffTree[i];
    const nextLevel = diffTree[i + 1]?.level ?? null;
    const spaces = setSpaces(currentNode.level);

    const value1 = valueToString(currentNode.value, currentNode.level);
    const value2 = valueToString(currentNode.value2, currentNode.level);

    if (currentNode.type === 'nested') {
      result.push(`${spaces}  ${currentNode.key} {`);
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
