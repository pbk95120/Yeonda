import { createTag, removeTag } from '@controllers/adminTag.controller';
import { authenticateUser } from '@middlewares/authenticateUser.middleware';
import { controllerWrapper } from '@middlewares/controllerWrapper.middleware';
import express from 'express';
const AdminTagRoute = express.Router();

AdminTagRoute.post('/', controllerWrapper(authenticateUser, createTag));
AdminTagRoute.delete('/:id', controllerWrapper(authenticateUser, removeTag));

export default AdminTagRoute;
