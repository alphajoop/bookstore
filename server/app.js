import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import connectDB from './config/dbConfig.js';
import loggerMiddleware from './middlewares/loggerMiddleware.js';
import bookRoutes from './routes/bookRoutes.js';

const app = express();

app.use(express.json());
app.use(loggerMiddleware);
app.use(cors());
/*app.use(
  cors({
    origin: process.env.ALLOWED_ORIGIN,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type'],
  })
);
*/

// Configuration de EJS comme moteur de modèle
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

dotenv.config();
connectDB();

app.get('/', (req, res) => {
  const title = 'Bookstore API';
  res.render('welcome', { title });
});

app.use('/api', bookRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
