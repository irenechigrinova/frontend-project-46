import { readFileSync } from 'node:fs';

import { getFullPath, getFileExtension } from './helpers.js';
import getParsedData from './parsers/index.js';
import buildDiffTree from './buildDiffTree.js';
import formatTree from './formatters/index.js';

export default (filepath1, filepath2, format = 'stylish') => {
  const content1 = getParsedData(readFileSync(getFullPath(filepath1), { encoding: 'utf8' }), getFileExtension(filepath1));
  const content2 = getParsedData(readFileSync(getFullPath(filepath2), { encoding: 'utf8' }), getFileExtension(filepath1));

  const diffTree = buildDiffTree(content1, content2);
  return formatTree(diffTree, format);
};
