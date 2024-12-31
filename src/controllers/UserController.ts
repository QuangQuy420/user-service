import { Request, Response } from 'express';
import * as MessageService from '../services/MessageService';

export const getAllMessage = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    const userId = await MessageService.getAllMessage(name, email, password);
    res.status(201).json({ success: true, userId });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const sendMessage = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const userId = await MessageService.sendMessage(email, password);
    res.status(200).json({ success: true, userId });
  } catch (error: any) {
    res.status(401).json({ success: false, message: error.message });
  }
};
