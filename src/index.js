import { Command } from 'commander';

import getFilesDiff from "./getFilesDiff.js";

const program = new Command();

export default () => {
    program
        .name('gendiff')
        .description('Compares two configuration files and shows a difference.')
        .version('0.0.1')
        .arguments('<filepath1> <filepath2>')
        .option('-f, --format <type>', 'output format')
        .action((filepath1, filepath2) => {
            const diff = getFilesDiff(filepath1, filepath2);
            console.log(diff);
        });

    if(process.argv.includes('--help') || process.argv.includes('-h')) {
        console.log(program.help());
    } else if (process.argv.includes('--version') || process.argv.includes('-V')) {
        console.log(program.version());
    } else {
        program.parse();
    }
}