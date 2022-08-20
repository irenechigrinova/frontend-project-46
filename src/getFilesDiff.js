import { readFileSync } from 'node:fs';
import uniq from 'lodash/uniq.js';

import { getFullPath, safelyParseJson, sortStrings } from "./helpers.js";

export default (filepath1, filepath2) => {
    const content1 = safelyParseJson(readFileSync(getFullPath(filepath1), { encoding: 'utf8' }));
    const content2 = safelyParseJson(readFileSync(getFullPath(filepath2), { encoding: 'utf8' }));

    const currentKeys = uniq([...Object.keys(content1), ...Object.keys(content2)]).sort(sortStrings);
    const result = currentKeys.reduce((result, key) => {
        const value1 = content1[key];
        const value2 = content2[key];
        if (typeof value1 !== 'undefined' && typeof value2 !== 'undefined') {
            if (value1 === value2) {
                return [...result, `\t  ${key}: ${value1}`]
            }
            return [...result, `\t- ${key}: ${value1}`, `\t+ ${key}: ${value2}`];
        }
        if (typeof value2 === 'undefined') {
            return [...result, `\t- ${key}: ${value1}`];
        }
        return [...result, `\t+ ${key}: ${value2}`];
    }, ['{']);
    result.push('}');
    return result.join('\n');
}