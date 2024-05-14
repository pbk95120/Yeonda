import { deleteRelationship, getChatlist } from '@controllers/chats.controller';
import { authenticateUser } from '@middlewares/authenticateUser.middleware';
import { controllerWrapper } from '@middlewares/controllerWrapper.middleware';
import express from 'express';
const ChatsRoute = express.Router();
ChatsRoute.use(express.json());

ChatsRoute.get('/', controllerWrapper(authenticateUser, getChatlist));
ChatsRoute.delete('/:user2_id', controllerWrapper(authenticateUser, deleteRelationship));

export default ChatsRoute;
