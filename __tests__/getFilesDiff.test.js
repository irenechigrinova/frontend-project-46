import { readFileSync } from 'node:fs';
import * as path from 'path';

import getFilesDiff from '../src/getFilesDiff.js';
import { safelyParseJson } from '../src/helpers.js';

describe('getFilesDiff tests', () => {
  const setData = (fileName, testFile1, testFile2, format = 'stylish') => {
    const content = readFileSync(`${path.resolve()}/__fixtures__/${fileName}`, { encoding: 'utf8' });
    const result = safelyParseJson(content).value;
    const diff = getFilesDiff(`src/test-data/${testFile1}`, `src/test-data/${testFile2}`, format);
    return { result, diff };
  };

  it('should test plain json data with stylish', () => {
    const { diff, result } = setData('plain-result.json', 'file1.json', 'file2.json');
    expect(diff).toEqual(result);
  });

  it('should test nested json data with stylish', () => {
    const { diff, result } = setData('nested-result.json', 'file1-1.json', 'file2-2.json');
    expect(diff).toEqual(result);
  });

  it('should test plain yaml data with stylish', () => {
    const { diff, result } = setData('yaml-plain-result.json', 'file1.yml', 'file2.yaml');
    expect(diff).toEqual(result);
  });

  it('should test nested yaml data with stylish', () => {
    const { diff, result } = setData('yaml-nested-result.json', 'file1-1.yml', 'file2-2.yaml');
    expect(diff).toEqual(result);
  });
});
