import { Request, Response } from 'express';
import { prisma } from '../prisma.js';

export const getRecords = async (req: Request, res: Response) => {
  try {
    const data = await prisma.product.findMany({
      select: {
        id: true,
        title: true,
        slug: true,
        imageUrl: true,
        price: true
      }
    });
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
};

export const getRecordsByCategory = async (req: Request, res: Response) => {
  try {
    const data = await prisma.product.findMany({
      select: {
        id: true,
        title: true,
        slug: true,
        price: true
      }
    });
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
};

export const getRecord = async (req: Request, res: Response) => {
  const { slug } = req.params;
  try {
    const data = await prisma.product.findFirst({
      where: { slug: slug },
      include: {
        productIngredients: {
          include: {
            ingredients: {
              select: {
                title: true
              }
            },
            units: {
              select: {
                name: true,
                abbreviation: true
              }
            }
          
          }
        }
      }
    });
    if (!data) res.status(404).json({ error: 'Product not found' });
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch product' });
  }
};