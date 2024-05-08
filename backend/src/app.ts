import { errorHandler } from '@middlewares/errorHandler';
import LoginRoute from '@routes/login.route';
import LogoutRoute from '@routes/logout.route';
import PasswordResetRoute from '@routes/passwordReset.route';
import SignupRoute from '@routes/signup.route';
import cookieParser from 'cookie-parser';
import 'dotenv/config';
import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import socketHandler from '@sockets/index';

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

const server = http.createServer(app);
const io = new Server(server, {
  path: '/chat',
  cors: {
    origin: process.env.CORS_ALLOWED_ORIGIN,
  },
  pingTimeout: 120000,
});

socketHandler(io);

app.use('/signup', SignupRoute);
app.use('/login', LoginRoute);
app.use('/logout', LogoutRoute);
app.use('/password/reset', PasswordResetRoute);

app.use(errorHandler);

export { server, io };
