import { errorHandler } from '@middlewares/errorHandler';
import SignupRoute from '@routes/signup.route';
import 'dotenv/config';
import express from 'express';

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/signup', SignupRoute);

app.use(errorHandler);

export default app;
