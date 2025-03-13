import express from 'express';
import { PORT } from './config/dotenv.js';
import connectDb from './config/db.js';
import authRoutes from './routes/auth.route.js';
import cookieParser from 'cookie-parser';
import authenticate from './middlewares/auth.middleware.js';
import diaryRoutes from './routes/diary.route.js';
import blogsRoutes from './routes/blogs.route.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

//Middlewares
app.use(express.json());
app.use(cookieParser());

//Routes
app.use('/api/auth', authRoutes);
app.use('/api/diary',authenticate, diaryRoutes);
app.use('/api/blogs',authenticate, blogsRoutes);

app.use(express.static(path.join(__dirname, 'client/dist')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/dist', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server is listening on ${PORT}`);
    connectDb();
});