import { Router } from 'express';
import * as AuthController from '../controllers/AuthController';

const authRouter = Router();

authRouter.post('/register', AuthController.register);
authRouter.post('/signin', AuthController.signin);
authRouter.post('/refresh-token', AuthController.refreshToken);

export default authRouter;
