import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Импорт ровно одной функции из index.js
// Все остальное является внутренностями библиотеки и не тестируется
// Сигнатура функции genDiff(filepath1, filepath2, formatName)
import genDiff from '../src/index.js';

// Константы __dirname и __filename недоступны при использовании EcmaScript модулей
// https://nodejs.org/dist/latest/docs/api/esm.html#esm_no_require_exports_module_exports_filename_dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const testList = [
  'yml',
  'json',
];

// Построение путей до фикстур не дублируется
// Сами данные хранятся в текстовых файлах (фикстурах), а не в самих тестах.
// https://ru.hexlet.io/courses/js-advanced-testing/lessons/fixtures/theory_unit
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFixture = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8').trim();

// Побочные эффекты правильно делать не на уровне модуля, а внутри хуков
// https://ru.hexlet.io/courses/js-testing/lessons/setup/theory_unit
// В данном случае чтение файлов выполнено тут из-за необходимости
// использовать только константы. Так как линтер проверяет код
// на иммутабельность и отсутствие переменных let.
// Также тут используется синхронный код, который будет выполнен
// строго до начала работы тестов. Поэтому проблемы нет.
const stylishResult = readFixture('result_stylish.txt');
const plainResult = readFixture('result_plain.txt');
// const jsonResult = readFixture('result_json.json');

describe('gendiff', () => {
  // Генерацию тестов использовать не обязательно, но и слишком много тестов быть не должно
  // Тесты плоских структур полностью покрываются тестами на вложенные структуры
  test.each(testList)('gendiff %s', (format) => {
    const filepath1 = getFixturePath(`file1.${format}`);
    const filepath2 = getFixturePath(`file2.${format}`);

    expect(genDiff(filepath1, filepath2)).toEqual(stylishResult);
    expect(genDiff(filepath1, filepath2, 'stylish')).toEqual(stylishResult);
    expect(genDiff(filepath1, filepath2, 'plain')).toEqual(plainResult);
    // Проверка генерации корректного JSON
    const data = genDiff(filepath1, filepath2, 'json');
    expect(() => JSON.parse(data)).not.toThrow();
    // expect(genDiff(filepath1, filepath2, 'json')).toEqual(jsonResult);
  });
});
