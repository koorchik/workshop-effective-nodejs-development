#!/usr/bin/env node
import docopt from 'docopt';
import config     from '../lib/config.cjs';
import Bank       from '../lib/domain-model/Bank.mjs';
import initModels from '../lib/domain-model/initModels.mjs';

const doc =
`Usage:
   add_bank.mjs --code=<code> --name=<name> [--country=<country-code>]
   add_bank.mjs -h | --help

Options:
   -h --help                     Show this screen.
   --code <code>                 Bank code.
   --name <name>                 Bank name.
   --country <country-code>      Country ISO Code.
`;

main(docopt.docopt(doc));

async function main(opts) {
    initModels(config.db);
    const bankData = {
        code        : opts['--code'],
        name        : opts['--name'],
        countryCode : opts['--country-code'] || 'UA'

    };

    try {
        await Bank.create(bankData);
        process.exit(0);
    } catch (error) {
        console.error(error);

        process.exit(1);
    }
}
