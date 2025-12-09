import dotenv from 'dotenv';
import express, { Request, Response } from 'express';
import connectDB from './config/db';
dotenv.config();  
const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3000;
const DB_URL_CONNECT:string|undefined=process.env.CONNECT_URL??"mongodb://localhost:27017/notes";
app.get('/', (req: Request, res: Response) => {
  res.json({ 
    message: 'Express + TypeScript server running!',
    port: PORT,
    env: process.env.NODE_ENV 
  });
});

const startServer = async () => {
  try {
    await connectDB(DB_URL_CONNECT);  
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
