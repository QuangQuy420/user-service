import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes';
import authRoutes from './routes/authRoutes';
import createMongoConnection from './mongodb/connect';

dotenv.config();
const app = express();

const port = process.env.PORT || 4000;

(async () => {
  try {
    await createMongoConnection(process.env.MONGODB_URI || '');

    app.use(cors());
    app.use(express.json());

    app.use('/api', userRoutes);
    app.use('/auth', authRoutes);

    app.get('/', (req: Request, res: Response) => {
      res.send('Hello World!');
    });

    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
    process.exit(1);
  }
})();
