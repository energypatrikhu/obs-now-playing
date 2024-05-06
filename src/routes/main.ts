import { Router } from 'express';
import { join } from 'node:path';

const router = Router();

router.get('/', (_req, res) => {
	res.sendFile('index.min.html', { root: join(__dirname, '../static') });
});

export default router;
