import { createUser, getSignupInfo, requestSignupEmail, verifySignupEmail } from '@controllers/signup.controller';
import { controllerWrapper } from '@middlewares/controllerWrapper.middleware';
import { memoryStorage } from '@middlewares/memoryStorage.middleware';
import express from 'express';

const SignupRoute = express.Router();

SignupRoute.get('/', controllerWrapper(getSignupInfo));
SignupRoute.post('/email', controllerWrapper(requestSignupEmail));
SignupRoute.post('/email/verify', controllerWrapper(verifySignupEmail));
SignupRoute.post('/', memoryStorage.single('picture'), controllerWrapper(createUser));

export default SignupRoute;
