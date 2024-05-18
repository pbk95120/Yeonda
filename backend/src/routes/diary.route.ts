import {
  createDiary,
  getFirstRandomDiary,
  getPopularDiaries,
  getRandomDiary,
  getTaggedPopularDiaries,
  proceedLike,
} from '@controllers/diary.controller';
import { authenticateUser } from '@middlewares/authenticateUser.middleware';
import controllerWrapper from '@middlewares/controllerWrapper.middleware';
import { textForm } from '@middlewares/textForm.middleware';
import express from 'express';
const DiaryRoute = express.Router();

DiaryRoute.post('/pre-random', controllerWrapper(authenticateUser, getFirstRandomDiary));
DiaryRoute.post('/random', controllerWrapper(authenticateUser, getRandomDiary));
DiaryRoute.post('/like/:id', controllerWrapper(authenticateUser, proceedLike));
DiaryRoute.get('/popular', controllerWrapper(authenticateUser, getPopularDiaries));
DiaryRoute.get('/popular/:tag_id', controllerWrapper(authenticateUser, getTaggedPopularDiaries));
DiaryRoute.post('/', textForm, controllerWrapper(authenticateUser, createDiary));

export default DiaryRoute;
