import { Router } from 'express';
import { createRecord, deleteRecord } from '../controllers/favoriteController';
import { Authorize } from '../middleware/authMiddleware';

const router = Router();
router.post('/', Authorize, createRecord);
router.delete('/:productId', Authorize, deleteRecord);

export const favoriteRoutes = router;
