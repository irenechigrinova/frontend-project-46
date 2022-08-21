import { readFileSync } from 'node:fs';
import * as path from 'path';

import getFilesDiff from '../src/getFilesDiff.js';
import { safelyParseJson } from '../src/helpers.js';

describe('getFilesDiff tests', () => {
  it('should test plain json data with stylish', () => {
    const content = readFileSync(`${path.resolve()}/__fixtures__/plain-result.json`, { encoding: 'utf8' });
    const result = safelyParseJson(content).value;
    const diff = getFilesDiff('src/test-data/file1.json', 'src/test-data/file2.json', 'stylish');
    expect(diff).toEqual(result);
  });

  it('should test nested json data with stylish', () => {
    const content = readFileSync(`${path.resolve()}/__fixtures__/nested-result.json`, { encoding: 'utf8' });
    const result = safelyParseJson(content).value;
    const diff = getFilesDiff('src/test-data/file1-1.json', 'src/test-data/file2-2.json', 'stylish');
    expect(diff).toEqual(result);
  });

  it('should test plain yaml data with stylish', () => {
    const content = readFileSync(`${path.resolve()}/__fixtures__/yaml-plain-result.json`, { encoding: 'utf8' });
    const result = safelyParseJson(content).value;
    const diff = getFilesDiff('src/test-data/file1.yml', 'src/test-data/file2.yaml', 'stylish');
    expect(diff).toEqual(result);
  });

  it('should test nested yaml data with stylish', () => {
    const content = readFileSync(`${path.resolve()}/__fixtures__/yaml-nested-result.json`, { encoding: 'utf8' });
    const result = safelyParseJson(content).value;
    const diff = getFilesDiff('src/test-data/file1-1.yml', 'src/test-data/file2-2.yaml', 'stylish');
    expect(diff).toEqual(result);
  });
});
