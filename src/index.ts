import dotenv from 'dotenv';
import express, { Request, Response } from 'express';

dotenv.config();  

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3000;

app.get('/', (req: Request, res: Response) => {
  res.json({ 
    message: 'Express + TypeScript server running!',
    port: PORT,
    env: process.env.NODE_ENV 
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
