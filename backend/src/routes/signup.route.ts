import { createUser, getSignupInfo } from '@controllers/signup.controller';
import { memoryStorage } from '@middlewares/memoryStorage';
import express from 'express';

const SignupRoute = express.Router();

SignupRoute.get('/', getSignupInfo);
SignupRoute.post('/', memoryStorage.single('picture'), createUser);

export default SignupRoute;
