import { Router } from 'express';
import { getRecord, getRecords } from '../controllers/categoryController';

const routes = Router();
routes.get('/', getRecords);
routes.get('/:slug', getRecord);

export const categoryRoutes = routes;
