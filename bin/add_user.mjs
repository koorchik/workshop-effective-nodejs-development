#!/usr/bin/env node
import docopt from 'docopt';
import config     from '../lib/config.cjs';
import User       from '../lib/domain-model/User.mjs';
import initModels from '../lib/domain-model/initModels.mjs';

const doc =
`Usage:
   add_user.js --email=<email> --password=<password> [--drop]
   add_user.js -h | --help

Options:
   -h --help                 Show this screen.
   -l --email <email>        Login for new user.
   -p --password <password>  Password for new user.
   -d --drop                 Drop database first.
`;

main(docopt.docopt(doc));

async function dropAllUsers() {
    await User.destroy({ where: {} });
}

async function main(opts) {
    initModels(config.db);
    const userData = {
        email          : opts['--email'] ? opts['--email'] : 'user@mail.com',
        password       : opts['--password'],
        agreeWithTerms : true
    };

    if (opts['--drop']) await dropAllUsers();

    try {
        const user = await User.create(userData);

        await user.activate();
        process.exit(0);
    } catch (error) {
        console.error(error);

        process.exit(1);
    }
}
