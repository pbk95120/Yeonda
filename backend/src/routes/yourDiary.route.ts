import { getYourDiary, getYourDiaryDetail } from '@controllers/yourDiary.controller';
import { authenticateUser } from '@middlewares/authenticateUser.middleware';
import { controllerWrapper } from '@middlewares/controllerWrapper.middleware';
import express from 'express';
const YourDiaryRoute = express.Router();

YourDiaryRoute.get('/:id', controllerWrapper(authenticateUser, getYourDiary));
YourDiaryRoute.get('/:id/:diary_id', controllerWrapper(authenticateUser, getYourDiaryDetail));

export default YourDiaryRoute;
