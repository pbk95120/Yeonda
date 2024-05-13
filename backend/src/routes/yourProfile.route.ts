import { getYourProfile } from '@controllers/yourProfile.controller';
import { controllerWrapper } from '@middlewares/controllerWrapper';
import express from 'express';
const YourProfileRoute = express.Router();

YourProfileRoute.get('/:id', controllerWrapper(getYourProfile));

export default YourProfileRoute;
