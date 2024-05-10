import {
  getMyPreference,
  getMyProfile,
  getMySetting,
  patchMyAddress,
  patchMyPicture,
} from '@controllers/myProfile.controller';
import { authenticateUser } from '@middlewares/authenticateUser';
import { controllerWrapper } from '@middlewares/controllerWrapper';
import { memoryStorage } from '@middlewares/memoryStorage';
import express from 'express';
const MyProfileRoute = express.Router();

MyProfileRoute.get('/', controllerWrapper(authenticateUser, getMyProfile));
MyProfileRoute.get('/setting', controllerWrapper(authenticateUser, getMySetting));
MyProfileRoute.patch(
  '/setting/picture',
  memoryStorage.single('picture'),
  controllerWrapper(authenticateUser, patchMyPicture),
);
MyProfileRoute.patch('/setting/address', controllerWrapper(authenticateUser, patchMyAddress));
MyProfileRoute.get('/preference', controllerWrapper(authenticateUser, getMyPreference));

export default MyProfileRoute;
