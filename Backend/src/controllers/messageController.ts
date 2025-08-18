import { Request, Response } from 'express';
import { prisma } from '../prisma.js';

export const getRecords = async (req: Request, res: Response) => {
  try {
    const data = await prisma.message.findMany({
      select: {
        id: true,
        name: true,
        email: true
      }
    });
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
};

export const getRecord = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const data = await prisma.message.findFirst({
      where: { id: Number(id) },
    });


    if (!data) res.status(404).json({ error: 'Message not found' });
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
};

export const createRecord = async (req: Request, res: Response) => {  
  const { name, email, message } = req.body;  

  if (!name || !email || !message) {
    res.status(400).json({ error: 'Name, email and message are required' });
    return
  }  

  try {
    const data = await prisma.message.create({
      data: {
        name,
        email,
        message
      },
    });
    res.status(201).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create message' });
  }
};

export const deleteRecord = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await prisma.message.delete({
      where: { id: Number(id) },
    });
    res.status(200).json({ message: 'Message deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete message' });
  }
};