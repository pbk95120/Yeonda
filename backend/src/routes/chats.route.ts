import express from 'express';
import { getChatlist, deleteRelationship } from '@controllers/chats.controller';
import { authenticateUser } from '@middlewares/authenticateUser';
const ChatsRoute = express.Router();
ChatsRoute.use(express.json());

ChatsRoute.get('/', authenticateUser, getChatlist);
ChatsRoute.delete('/:user2_id', authenticateUser, deleteRelationship);

export default ChatsRoute;
