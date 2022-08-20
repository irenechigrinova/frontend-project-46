import * as path from 'path';
import { getFullPath, safelyParseJson, sortStrings } from '../src/helpers.js';

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
});
