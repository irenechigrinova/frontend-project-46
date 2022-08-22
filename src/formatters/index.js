import stylish from './stylish-formatter.js';
import plain from './plain-formatter.js';

export default (content, type) => {
  switch (type) {
    case 'stylish':
      return stylish(content);
    case 'plain':
      return plain(content);
    case 'json':
      return JSON.stringify(content);
    default:
      throw new Error('Style type is unknown');
  }
};
