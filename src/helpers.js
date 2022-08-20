import * as path from 'path';

export const getFullPath = filepath => path.resolve(process.cwd(), filepath);

export const safelyParseJson = str => {
    try {
        return JSON.parse(str);
    } catch {
        throw new Error('bad json format');
    }
}

export const sortStrings = (a, b) => a.localeCompare(b);