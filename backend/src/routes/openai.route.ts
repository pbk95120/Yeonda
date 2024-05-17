import { createTag } from '@controllers/openai.controller';
import { authenticateUser } from '@middlewares/authenticateUser.middleware';
import { controllerWrapper } from '@middlewares/controllerWrapper.middleware';
import express from 'express';
const OpenAIRoute = express.Router();

OpenAIRoute.post('/embedding/tag', controllerWrapper(authenticateUser, createTag));

export default OpenAIRoute;
