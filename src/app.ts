import express from 'express';
import cors from 'cors';
import path from 'path';

const app = express();

app.use(express.json({ limit: '16kb' }));
app.use(express.urlencoded({ extended: true, limit: '16kb' }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors({
    origin: process.env.CORS_ORIGIN?.split(',') || 'http://localhost:5173',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.get('/', (req, res) => {
    res.send('Hello World to BaseCamp');
});

app.get('/instagram', (req, res) => {
    res.send('Hello World from instagram to BaseCamp');
});

export default app;