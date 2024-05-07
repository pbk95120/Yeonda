import { errorHandler } from '@middlewares/errorHandler';
import LoginRoute from '@routes/login.route';
import LogoutRoute from '@routes/logout.route';
import PasswordResetRoute from '@routes/passwordReset.route';
import SignupRoute from '@routes/signup.route';
import cookieParser from 'cookie-parser';
import 'dotenv/config';
import express from 'express';

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use('/signup', SignupRoute);
app.use('/login', LoginRoute);
app.use('/logout', LogoutRoute);
app.use('/password/reset', PasswordResetRoute);

app.use(errorHandler);

export default app;
