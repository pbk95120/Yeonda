import { getYourDiary } from '@controllers/yourDiary.controller';
import { authenticateUser } from '@middlewares/authenticateUser.middleware';
import { controllerWrapper } from '@middlewares/controllerWrapper.middleware';
import express from 'express';
const YourDiaryRoute = express.Router();

YourDiaryRoute.get('/:id', controllerWrapper(authenticateUser, getYourDiary));

export default YourDiaryRoute;
