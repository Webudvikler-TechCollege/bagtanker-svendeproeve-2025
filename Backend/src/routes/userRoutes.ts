import { Router } from 'express';
import { getRecords, getRecord, createRecord, updateRecord, deleteRecord } from '../controllers/userController';

const router = Router();
router.get('/', getRecords);
router.get('/:id', getRecord);
router.post('/', createRecord);
router.put('/:id', updateRecord);
router.delete('/:id', deleteRecord);

export const userRoutes = router;
