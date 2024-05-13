import { getYourProfile } from '@controllers/yourProfile.controller';
import { authenticateUser } from '@middlewares/authenticateUser';
import { controllerWrapper } from '@middlewares/controllerWrapper';
import express from 'express';
const YourProfileRoute = express.Router();

YourProfileRoute.get('/:id', controllerWrapper(authenticateUser, getYourProfile));

export default YourProfileRoute;
