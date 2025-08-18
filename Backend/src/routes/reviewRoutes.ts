import { Router } from 'express';
import { Authorize } from '../middleware/authMiddleware';
import { createRecord, deleteRecord, getRecord, getRecords, getRecordsByProductId, updateRecord } from '../controllers/reviewController';

const routes = Router();
routes.get('/', getRecords);
routes.get('/byId/:id', getRecord);
routes.get('/byProduct/:productId', getRecordsByProductId);
routes.post('/', Authorize, createRecord);
routes.put('/:id', Authorize, updateRecord);
routes.delete('/:id', Authorize, deleteRecord);

export const reviewRoutes = routes;