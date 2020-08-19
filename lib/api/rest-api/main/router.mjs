import express     from 'express';
import * as banks from  './controllers/banks.mjs';

const router = express.Router();

// Banks
router.post('/banks',       banks.create);
router.get('/banks/:id',    banks.show);
router.get('/banks',        banks.list);
router.put('/banks/:id',    banks.update);
router.delete('/banks/:id', banks.remove);

export default router;
