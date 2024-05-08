import express from 'express';
import { getChatlist, deleteRelationship } from '@controllers/chats.controller';
import { authenticateUser } from '@middlewares/authenticateUser';
import { controllerWrapper } from '@middlewares/controllerWrapper';
const ChatsRoute = express.Router();
ChatsRoute.use(express.json());

ChatsRoute.get('/', authenticateUser, controllerWrapper(getChatlist));
ChatsRoute.delete('/:user2_id', authenticateUser, controllerWrapper(deleteRelationship));

export default ChatsRoute;
