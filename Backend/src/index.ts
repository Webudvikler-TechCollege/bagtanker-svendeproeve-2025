import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { userRoutes } from './routes/userRoutes';
import { productRoutes } from './routes/productRoutes';
import { authRoutes } from './routes/authRoutes';
import path from 'path';
import { reviewRoutes } from './routes/reviewRoutes';
import { categoryRoutes } from './routes/categoryRoutes';
import { favoriteRoutes } from './routes/favoriteRoutes';
import { newsRoutes } from './routes/newsRoutes';
import { messageRoutes } from './routes/messageRoutes';
import { newsletterRoutes } from './routes/newsletterRoutes';
import { slideRoutes } from './routes/slideRoutes';

dotenv.config();
const port = process.env.SERVERPORT || 3000

const app = express();
const IMAGES_DIR = path.resolve(process.cwd(), "assets", "images");
app.use("/images", express.static(IMAGES_DIR));
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cors())

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/products', productRoutes);
app.use('/api/favorites', favoriteRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/news', newsRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/newsletters', newsletterRoutes);
app.use('/api/slides', slideRoutes);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});