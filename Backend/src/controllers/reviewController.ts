import { Request, Response } from 'express';
import { prisma } from '../prisma.js';
import { toBoolean } from '../utils/formatter.js';

export const getRecords = async (req: Request, res: Response) => {
  try {
    const data = await prisma.review.findMany();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch reviews' });
  }
};

export const getRecord = async (req: Request, res: Response) => {
  const { id } = req.params
  try {
    const data = await prisma.review.findUnique({
      where: {
        id: Number(id),
      },
      include: {
        user: {
          select: {
            name: true,
            email: true
          }
        }

      }
    });
  res.json(data);
} catch (error) {
  console.error(error);
  res.status(500).json({ error: 'Failed to fetch review' });
}
};

export const getRecordsByProductId = async (req: Request, res: Response) => {
  const { productId } = req.params
  try {
    const data = await prisma.review.findMany({
      where: {
        productId: Number(productId),
      },
      select: {
        title: true,
        comment: true,
        numStars: true,
        user: {
          select: {
            name: true,
            email: true
          }
        }
      },

    });

    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch reviews' });
  }
};

export const createRecord = async (req: Request, res: Response) => {
  const userId = req.user?.id;

  const { title, comment, numStars, productId, isActive } = req.body;

  if (!title || !comment || !numStars || !productId) {
    res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const data = await prisma.review.create({
      data: {
        title,
        comment,
        numStars: Number(numStars),
        userId: Number(userId),
        productId: Number(productId),
        isActive: toBoolean(isActive)
      },
    });
    res.status(201).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create review' });
  }
};

export const updateRecord = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, comment, numStars } = req.body;

  try {
    const dataToUpdate: any = {
      title,
      comment,
      numStars: Number(numStars)
    };

    const data = await prisma.review.update({
      where: { id: Number(id) },
      data: dataToUpdate,
    });

    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update review' });
  }
};

export const deleteRecord = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await prisma.review.delete({
      where: { id: Number(id) },
    });
    res.status(200).json({ message: 'Review deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete review' });
  }
};
