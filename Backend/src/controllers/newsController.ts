import { Request, Response } from 'express';
import { prisma } from '../prisma.js';

export const getRecords = async (req: Request, res: Response) => {
  try {
    const data = await prisma.news.findMany({
      select: {
        id: true,
        title: true,
        slug: true,
        teaser: true,
        imageUrl: true
      },
      where: {
        isActive: true
      }
    });
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch news' });
  }
};

export const getRecord = async (req: Request, res: Response) => {
  const { slug } = req.params;

  try {
    const data = await prisma.news.findFirst({
      where: { slug }
    });

    if (!data) res.status(404).json({ error: 'News not found' });
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch news' });
  }
};