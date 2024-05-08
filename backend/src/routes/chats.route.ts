import express from 'express';
import { getChatlist } from '@controllers/chats.controller';
import { authenticateUser } from '@middlewares/authenticateUser';
const ChatsRoute = express.Router();
ChatsRoute.use(express.json());

ChatsRoute.get('/', authenticateUser, getChatlist);

export default ChatsRoute;
