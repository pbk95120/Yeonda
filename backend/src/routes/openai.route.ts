import { createTag } from '@controllers/openai.controller';
import { controllerWrapper } from '@middlewares/controllerWrapper.middleware';
import express from 'express';
const OpenAIRoute = express.Router();

OpenAIRoute.post('/embedding/tag', controllerWrapper(createTag));

export default OpenAIRoute;
