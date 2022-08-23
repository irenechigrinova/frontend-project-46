#!/usr/bin/env node
import { Command } from 'commander';

import genDiff from '../src/index.js';

const program = new Command();

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('0.0.1')
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format <type>', 'output format', 'stylish')
  .action((filepath1, filepath2) => {
    const diff = genDiff(filepath1, filepath2, program.opts().format);
    console.log(diff);
  });

if (process.argv.includes('--help') || process.argv.includes('-h')) {
  console.log(program.help());
} else if (process.argv.includes('--version') || process.argv.includes('-V')) {
  console.log(program.version());
} else {
  program.parse();
}
