import { deleteRelationship, getChatlist } from '@controllers/chat.controller';
import { authenticateUser } from '@middlewares/authenticateUser.middleware';
import { controllerWrapper } from '@middlewares/controllerWrapper.middleware';
import express from 'express';
const ChatRoute = express.Router();
ChatRoute.use(express.json());

ChatRoute.get('/', controllerWrapper(authenticateUser, getChatlist));
ChatRoute.delete('/:user2_id', controllerWrapper(authenticateUser, deleteRelationship));

export default ChatRoute;
