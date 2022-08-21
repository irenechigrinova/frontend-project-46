import * as path from 'path';

export const getFullPath = (filepath) => path.resolve(process.cwd(), filepath);

export const safelyParseJson = (str) => {
  try {
    return JSON.parse(str);
  } catch {
    throw new Error('bad json format');
  }
};

export const sortStrings = (a, b) => a.localeCompare(b);

export const getFileExtension = (filepath) => path.extname(filepath).substring(1);

export const isObject = (entity) => !!entity && typeof entity === 'object' && !Array.isArray(entity);

export const uniq = (array) => {
  const result = array.reduce((acc, item) => {
    if (!acc[item]) return { ...acc, [item]: item };
    return acc;
  }, {});
  return Object.values(result);
};
