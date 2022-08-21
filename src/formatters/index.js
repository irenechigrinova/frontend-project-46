import stylish from './stylish-formatter.js';

export default (content, type) => {
  switch (type) {
    case 'stylish':
      return stylish(content);
    default:
      throw new Error('Style type is unknown');
  }
};
