/* eslint import/imports-first:0  import/newline-after-import:0 */
import express       from 'express';

import adminRouter   from './admin/router.mjs';
import mainRouter    from './main/router.mjs';

// Init app
const app = express();

app.use('/api/v1/admin', adminRouter);
app.use('/api/v1', mainRouter);

export function start({ appPort }) {
    const server = app.listen(appPort, () => {
        const { port, address } = server.address();

        console.info(`[RestApiApp] STARTING AT PORT [${port}] ADDRESS [${address}]`);
    });
}

export default app;
