import { controllerWrapper } from '@middlewares/controllerWrapper';
import { getMyProfile, getMySetting } from '@src/controllers/myProfile.controller';
import express from 'express';
const MyProfileRoute = express.Router();

MyProfileRoute.get('/', controllerWrapper(getMyProfile));
MyProfileRoute.get('/setting', controllerWrapper(getMySetting));

export default MyProfileRoute;
