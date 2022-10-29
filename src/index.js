import { readFileSync } from 'node:fs';

import { getFullPath, getFileExtension } from './helpers.js';
import getParsedData from './parsers/index.js';
import buildDiffTree from './buildDiffTree.js';
import formatTree from './formatters/index.js';

export default (filepath1, filepath2, format = 'stylish') => {
  const data1 = readFileSync(getFullPath(filepath1), { encoding: 'utf8' });
  const data2 = readFileSync(getFullPath(filepath2), { encoding: 'utf8' });

  const data1Ext = getFileExtension(filepath1);
  const data2Ext = getFileExtension(filepath2);

  const content1 = getParsedData(data1, data1Ext);
  const content2 = getParsedData(data2, data2Ext);

  const diffTree = buildDiffTree(content1, content2);
  return formatTree(diffTree, format);
};
