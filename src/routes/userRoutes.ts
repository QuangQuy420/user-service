import express, { Request, Response } from 'express';
import * as MessageController from '../controllers/MessageController';

const router = express.Router();

router.post('/message', (req: Request, res: Response) =>
  MessageController.getAllMessage(req, res)
);
router.post('/send-message', (req: Request, res: Response) =>
  MessageController.sendMessage(req, res)
);

export default router;
