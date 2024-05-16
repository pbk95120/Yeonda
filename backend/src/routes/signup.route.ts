import { createUser, getSignupInfo } from '@controllers/signup.controller';
import { controllerWrapper } from '@middlewares/controllerWrapper';
import { memoryStorage } from '@middlewares/memoryStorage';
import express from 'express';

const SignupRoute = express.Router();

SignupRoute.get('/', controllerWrapper(getSignupInfo));
SignupRoute.post('/', memoryStorage.single('picture'), controllerWrapper(createUser));

export default SignupRoute;
