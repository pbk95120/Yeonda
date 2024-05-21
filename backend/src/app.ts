import { errorHandler } from '@middlewares/errorHandler.middleware';
import AdminTagRoute from '@routes/adminTag.route';
import ChatRoute from '@routes/chat.route';
import DiaryRoute from '@routes/diary.route';
import LoginRoute from '@routes/login.route';
import LogoutRoute from '@routes/logout.route';
import MyDiaryRoute from '@routes/myDiary.route';
import MyProfileRoute from '@routes/myProfile.route';
import PasswordResetRoute from '@routes/passwordReset.route';
import SignoutRoute from '@routes/signout.route';
import SignupRoute from '@routes/signup.route';
import TagRoute from '@routes/tag.route';
import YourDiaryRoute from '@routes/yourDiary.route';
import YourProfileRoute from '@routes/yourProfile.route';
import socketHandler from '@sockets/index';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import 'dotenv/config';
import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import AdminUserRoute from './routes/adminUser.route';

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  cors({
    origin: process.env.CORS_ALLOWED_ORIGIN,
    credentials: true,
  }),
);
app.use(cookieParser());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.CORS_ALLOWED_ORIGIN,
    credentials: true,
  },
  pingTimeout: 1200000,
});

socketHandler(io);

app.use('/signup', SignupRoute);
app.use('/signout', SignoutRoute);
app.use('/login', LoginRoute);
app.use('/logout', LogoutRoute);
app.use('/tag', TagRoute);
app.use('/password/reset', PasswordResetRoute);
app.use('/profile/my', MyProfileRoute);
app.use('/profile/your', YourProfileRoute);
app.use('/diary/my', MyDiaryRoute);
app.use('/diary/your', YourDiaryRoute);
app.use('/chatlist', ChatRoute);
app.use('/diary', DiaryRoute);
app.use('/admin/tag', AdminTagRoute);
app.use('/admin/user', AdminUserRoute);

app.use(errorHandler);

export { io, server };
