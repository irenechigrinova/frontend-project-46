import { readFileSync } from 'node:fs';
import uniq from 'lodash/uniq.js';

import { getFullPath, sortStrings, getFileExtension } from './helpers.js';
import getParsedData from './parsers/index.js';

export default (filepath1, filepath2) => {
  console.log(getFileExtension(filepath1));
  const content1 = getParsedData(readFileSync(getFullPath(filepath1), { encoding: 'utf8' }), getFileExtension(filepath1));
  const content2 = getParsedData(readFileSync(getFullPath(filepath2), { encoding: 'utf8' }), getFileExtension(filepath1));
  console.log(content1);

  const currentKeys = uniq([...Object.keys(content1), ...Object.keys(content2)]).sort(sortStrings);
  const result = currentKeys.reduce((acc, key) => {
    const value1 = content1[key];
    const value2 = content2[key];
    if (typeof value1 !== 'undefined' && typeof value2 !== 'undefined') {
      if (value1 === value2) {
        return [...acc, `\t  ${key}: ${value1}`];
      }
      return [...acc, `\t- ${key}: ${value1}`, `\t+ ${key}: ${value2}`];
    }
    if (typeof value2 === 'undefined') {
      return [...acc, `\t- ${key}: ${value1}`];
    }
    return [...acc, `\t+ ${key}: ${value2}`];
  }, ['{']);
  result.push('}');
  return result.join('\n');
};
