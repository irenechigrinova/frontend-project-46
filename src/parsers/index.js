import yamlParser from './yaml-parser.js';
import jsonParser from './json-parser.js';

export default (content, type) => {
  switch (type) {
    case 'json':
      return jsonParser(content);
    case 'yml':
    case 'yaml':
      return yamlParser(content);
    default:
      throw new Error('Format type is unknown');
  }
};
