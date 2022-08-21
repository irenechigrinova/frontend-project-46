import * as path from 'path';
import {
  getFullPath, safelyParseJson, sortStrings, getFileExtension, isObject,
} from '../src/helpers.js';

describe('helpers tests', () => {
  it('should test getFullPath func', () => {
    const pathToFile = getFullPath('./src/test-data/file1.json');
    expect(pathToFile.indexOf(path.resolve())).not.toBe(-1);
  });

  it('should test safelyParseJson func', () => {
    const json = '{ "name": "test" }';
    expect(safelyParseJson(json)).toBeTruthy();
  });

  it('should throw error when testing safelyParseJson func', () => {
    const json = '{ "name": "test", }';
    expect(() => { safelyParseJson(json); }).toThrow(Error);
  });

  it('should test sortStrings func', () => {
    const strings = ['some string', 'another string'];
    strings.sort(sortStrings);
    expect(strings).toEqual(['another string', 'some string']);
  });

  it('should test getFileExtension func', () => {
    const file1 = '../src/test/test.json';
    const file2 = './src/test/test.yml';
    const file3 = '../../src/test/test.yaml';

    expect(getFileExtension(file1)).toBe('json');
    expect(getFileExtension(file2)).toBe('yml');
    expect(getFileExtension(file3)).toBe('yaml');
  });

  it('should test isObject func', () => {
    expect(isObject([])).toBe(false);
    expect(isObject('')).toBe(false);
    expect(isObject({})).toBe(true);
    expect(isObject(() => {})).toBe(false);
    expect(isObject(undefined)).toBe(false);
  });
});
