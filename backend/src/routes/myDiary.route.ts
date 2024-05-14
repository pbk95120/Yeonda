import { getMyDiary, getMyDiaryDetail } from '@controllers/myDiary.controller';
import { authenticateUser } from '@middlewares/authenticateUser.middleware';
import { controllerWrapper } from '@middlewares/controllerWrapper.middleware';
import express from 'express';
const MyDiaryRoute = express.Router();

MyDiaryRoute.get('/', controllerWrapper(authenticateUser, getMyDiary));
MyDiaryRoute.get('/:id', controllerWrapper(authenticateUser, getMyDiaryDetail));

export default MyDiaryRoute;
