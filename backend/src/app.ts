import cookieParser from 'cookie-parser';
import 'dotenv/config';
import express from 'express';

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

export default app;
