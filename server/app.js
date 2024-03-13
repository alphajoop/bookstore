import dotenv from 'dotenv';
import express from 'express';
import connectDB from './config/dbConfig.js';

const app = express();

app.use(express.json());

dotenv.config();
connectDB();

app.get('/', (req, res) => {
  console.log(req);
  return res.status(234).send('Welcome to my bookstore');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
