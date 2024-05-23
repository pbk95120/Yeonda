import {
  changeMyTag,
  getMyPreference,
  getMyProfile,
  getMySetting,
  getMyTag,
  patchMyAddress,
  patchMyPicture,
  patchMyPreference,
  removeMyPicture,
} from '@controllers/myProfile.controller';
import { authenticateUser } from '@middlewares/authenticateUser.middleware';
import { controllerWrapper } from '@middlewares/controllerWrapper.middleware';
import { memoryStorage } from '@middlewares/memoryStorage.middleware';
import express from 'express';
const MyProfileRoute = express.Router();

MyProfileRoute.get('/', controllerWrapper(authenticateUser, getMyProfile));
MyProfileRoute.get('/setting', controllerWrapper(authenticateUser, getMySetting));
MyProfileRoute.patch(
  '/setting/picture',
  memoryStorage.single('picture'),
  controllerWrapper(authenticateUser, patchMyPicture),
);
MyProfileRoute.delete('/setting/picture', controllerWrapper(authenticateUser, removeMyPicture));
MyProfileRoute.patch('/setting/address', controllerWrapper(authenticateUser, patchMyAddress));
MyProfileRoute.get('/preference', controllerWrapper(authenticateUser, getMyPreference));
MyProfileRoute.patch('/preference', controllerWrapper(authenticateUser, patchMyPreference));
MyProfileRoute.get('/tag', controllerWrapper(authenticateUser, getMyTag));
MyProfileRoute.put('/tag', controllerWrapper(authenticateUser, changeMyTag));

export default MyProfileRoute;
