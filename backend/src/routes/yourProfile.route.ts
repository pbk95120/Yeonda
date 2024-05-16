import { getYourProfile } from '@controllers/yourProfile.controller';
import { authenticateUser } from '@middlewares/authenticateUser.middleware';
import { controllerWrapper } from '@middlewares/controllerWrapper.middleware';
import express from 'express';
const YourProfileRoute = express.Router();

YourProfileRoute.get('/:id', controllerWrapper(authenticateUser, getYourProfile));

export default YourProfileRoute;
