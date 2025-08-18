import { Router } from 'express';
import { getRecords } from '../controllers/slideController';

const router = Router();
router.get('/', getRecords);

export const slideRoutes = router;
