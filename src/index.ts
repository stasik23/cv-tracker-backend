import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import 'dotenv/config';
import {dbConnect} from "./db/db";
import { logger } from './middleware/logger';

const app: Express = express();


const PORT: number = 3000;

app.use(express.json());

app.use(logger);

dbConnect();

app.use(cors({
  origin: process.env.DOMAIN_CLIENT,
}));

app.get('/api/message', async (req: Request, res: Response): Promise<void> => {
  try {
    res.json({
      message: 'Express backend is working',
    });
  } catch (error: any) {
    res.json({
      message: error.message,
      status: 'Working is bad',
    });
  }
});

app.post('/api/message', async (req: Request, res: Response): Promise<void> => {
  const { message } = req.body;
  res.json({ message });
});

app.listen(PORT, () => {
  console.log(`Server started at port http://localhost:${PORT}`);
  console.log(`Check route: http://localhost:${PORT}/api/message`);
});