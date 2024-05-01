import { getSignupInfo } from '@controllers/signup.controller';
import express from 'express';

const SignupRoute = express.Router();

SignupRoute.get('/', getSignupInfo);

export default SignupRoute;
