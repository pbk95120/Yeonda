import { getMyProfile, getMySetting, patchMyPicture } from '@controllers/myProfile.controller';
import { controllerWrapper } from '@middlewares/controllerWrapper';
import { memoryStorage } from '@middlewares/memoryStorage';
import express from 'express';
const MyProfileRoute = express.Router();

MyProfileRoute.get('/', controllerWrapper(getMyProfile));
MyProfileRoute.get('/setting', controllerWrapper(getMySetting));
MyProfileRoute.patch('/setting/picture', memoryStorage.single('picture'), controllerWrapper(patchMyPicture));

export default MyProfileRoute;
