import { Router } from 'express';
import { getRecords, getRecord, createRecord, deleteRecord } from '../controllers/messageController';
import { Authorize } from '../middleware/authMiddleware';

const router = Router();
router.get('/', getRecords);
router.get('/:id', getRecord);
router.post('/', createRecord);
router.delete('/:id', Authorize, deleteRecord);

export const messageRoutes = router;
