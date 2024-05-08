import { controllerWrapper } from '@middlewares/controllerWrapper';
import { getMyProfile } from '@src/controllers/myProfile.controller';
import express from 'express';
const MyProfileRoute = express.Router();

MyProfileRoute.get('/', controllerWrapper(getMyProfile));

export default MyProfileRoute;
