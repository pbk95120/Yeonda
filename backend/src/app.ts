import { errorHandler } from '@middlewares/errorHandler';
import SignupRoute from '@routes/signup.route';
import 'dotenv/config';
import express from 'express';
import 'express-async-errors';

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
  res.sendFile(process.env.BASE_FILE);
});
app.use('/signup', SignupRoute);

app.use(errorHandler);

export default app;
