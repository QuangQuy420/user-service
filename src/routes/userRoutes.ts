import { Router } from 'express';
import * as UserController from '../controllers/UserController';
import { authenticate, authorizeRole } from '../middlewares/authMiddleware';

const router = Router();

router.get(
  '/me',
  authenticate,
  authorizeRole(['user', 'admin']),
  UserController.getUser
);

export default router;
