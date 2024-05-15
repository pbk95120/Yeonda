import { getFirstRandomDiary, getRandomDiary, proceedLike } from '@controllers/diary.controller';
import { authenticateUser } from '@middlewares/authenticateUser.middleware';
import controllerWrapper from '@middlewares/controllerWrapper.middleware';
import express from 'express';
const DiaryRoute = express.Router();

DiaryRoute.get('/pre-random', controllerWrapper(authenticateUser, getFirstRandomDiary));
DiaryRoute.get('/random', controllerWrapper(authenticateUser, getRandomDiary));
DiaryRoute.post('/like/:id', controllerWrapper(authenticateUser, proceedLike));

export default DiaryRoute;
