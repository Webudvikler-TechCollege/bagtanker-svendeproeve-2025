import { Router } from 'express';
import { getRecord, getRecords } from '../controllers/newsController';

const routes = Router();
routes.get('/', getRecords);
routes.get('/:slug', getRecord);

export const newsRoutes = routes;
