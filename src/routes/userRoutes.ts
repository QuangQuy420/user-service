import { Router } from 'express';
import * as UserController from '../controllers/UserController';
import { authenticate } from '../middlewares/authMiddleware';

const router = Router();

router.post('/register', UserController.register);
router.post('/signin', UserController.signin);
router.get('/me', authenticate, UserController.getUser);

export default router;
