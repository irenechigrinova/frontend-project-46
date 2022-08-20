import getFilesDiff from '../src/getFilesDiff.js';

describe('getFilesDiff tests', () => {
  it('should test simple json data', () => {
    const result = '{\n\t- follow: false\n\t  host: hexlet.io\n\t- proxy: 123.234.53.22\n\t- timeout: 50\n\t+ timeout: 20\n\t+ verbose: true\n}';
    const diff = getFilesDiff('src/test-data/file1.json', 'src/test-data/file2.json');
    console.log(diff);
    expect(diff).toEqual(result);
  });

  it('should test simple yml data', () => {
    const result = '{\n\t  ecmaVersion: latest\n\t- extends: airbnb-base\n\t+ extends: airbnb-base-1\n\t- no-console: 0\n\t+ no-console: 1\n}';
    const diff = getFilesDiff('src/test-data/file1.yml', 'src/test-data/file2.yaml');
    console.log(diff);
    expect(diff).toEqual(result);
  });
});
