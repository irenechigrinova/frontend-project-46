import { readFileSync } from 'node:fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

import getDiff from '../src/index.js';
import { safelyParseJson } from '../src/helpers.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getPathToFixture = (folderName, fileName) => path.join(__dirname, '..', '__fixtures__', folderName, fileName);

describe('getDiff tests', () => {
  test.concurrent.each([
    ['file1.json', 'file2.json', 'plain-result.json', 'stylish'],
    ['file1-1.json', 'file2-2.json', 'nested-result.json', 'stylish'],
    ['file1.yml', 'file2.yaml', 'yaml-plain-result.json', 'stylish'],
    ['file1-1.yml', 'file2-2.yaml', 'yaml-nested-result.json', 'stylish'],
    ['file1.json', 'file2.json', 'plain-result-plain.json', 'plain'],
    ['file1-1.json', 'file2-2.json', 'nested-result-plain.json', 'plain'],
    ['file1.yml', 'file2.yaml', 'yaml-plain-result-plain.json', 'plain'],
    ['file1-1.yml', 'file2-2.yaml', 'yaml-nested-result-plain.json', 'plain'],
    ['file1.json', 'file2.json', 'plain-result-json.json', 'json'],
    ['file1-1.json', 'file2-2.json', 'nested-result-json.json', 'json'],
    ['file1.yml', 'file2.yaml', 'yaml-plain-result-json.json', 'json'],
    ['file1-1.yml', 'file2-2.yaml', 'yaml-nested-result-json.json', 'json'],
  ])('should test getDiff for %s and %s with %s formatter', async (testFile1, testFile2, expected, format) => {
    const content = readFileSync(getPathToFixture('results', expected), { encoding: 'utf8' });
    const result = safelyParseJson(content).value;
    const diff = getDiff(getPathToFixture('test-data', testFile1), getPathToFixture('test-data', testFile2), format);
    expect(diff).toEqual(result);
  });
});
