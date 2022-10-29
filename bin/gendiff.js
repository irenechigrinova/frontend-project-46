#!/usr/bin/env node
import { Command } from 'commander';

import genDiff from '../src/index.js';

const program = new Command();

program
  .version('0.0.1', '-v, --version')
  .arguments('<filepath1> <filepath2>')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format <type>', 'output format', 'stylish')
  .action((filepath1, filepath2) => {
    const diff = genDiff(filepath1, filepath2, program.opts().format);
    console.log(diff);
  })
  .parse(process.argv);
