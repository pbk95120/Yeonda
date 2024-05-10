import { getMyProfile, getMySetting, patchMyAddress, patchMyPicture } from '@controllers/myProfile.controller';
import { controllerWrapper } from '@middlewares/controllerWrapper';
import { memoryStorage } from '@middlewares/memoryStorage';
import express from 'express';
import { authenticateUser } from './../middlewares/authenticateUser';
const MyProfileRoute = express.Router();

MyProfileRoute.get('/', controllerWrapper(authenticateUser, getMyProfile));
MyProfileRoute.get('/setting', controllerWrapper(authenticateUser, getMySetting));
MyProfileRoute.patch(
  '/setting/picture',
  memoryStorage.single('picture'),
  controllerWrapper(authenticateUser, patchMyPicture),
);
MyProfileRoute.patch('/setting/address', controllerWrapper(patchMyAddress));

export default MyProfileRoute;
