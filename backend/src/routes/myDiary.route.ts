import { getMyDiary, getMyDiaryDetail, changeMyDiary } from '@controllers/myDiary.controller';
import { authenticateUser } from '@middlewares/authenticateUser.middleware';
import { controllerWrapper } from '@middlewares/controllerWrapper.middleware';
import express from 'express';
const MyDiaryRoute = express.Router();

MyDiaryRoute.get('/', controllerWrapper(authenticateUser, getMyDiary));
MyDiaryRoute.get('/:id', controllerWrapper(authenticateUser, getMyDiaryDetail));
MyDiaryRoute.put('/:id', controllerWrapper(authenticateUser, changeMyDiary));

export default MyDiaryRoute;
