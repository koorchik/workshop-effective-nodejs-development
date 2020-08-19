import * as RestAPI from './lib/api/rest-api/app.mjs';
import * as DomainModel from './lib/domain-model/index.mjs';

import config from './lib/config.cjs';

async function main() {
    RestAPI.start({ appPort: config.appPort });
    DomainModel.initModels(config.db);
}

main().catch((error) => {
    console.error(error);
    process.exit(1);
});
