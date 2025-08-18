import { Router } from 'express';
import { createRecord, deleteRecord } from '../controllers/newsletterController';
import { Authorize } from '../middleware/authMiddleware';

const router = Router();
router.post('/', createRecord);
router.delete('/:id', Authorize, deleteRecord);

export const newsletterRoutes = router;
