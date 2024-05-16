import express from 'express';
import { getChatlist, deleteRelationship } from '@controllers/chats.controller';
import { authenticateUser } from '@middlewares/authenticateUser';
import { controllerWrapper } from '@middlewares/controllerWrapper';
const ChatsRoute = express.Router();
ChatsRoute.use(express.json());

ChatsRoute.get('/', controllerWrapper(authenticateUser, getChatlist));
ChatsRoute.delete('/:user2_id', controllerWrapper(authenticateUser, deleteRelationship));

export default ChatsRoute;
