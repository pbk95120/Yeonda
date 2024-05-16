import { proceedSignout } from '@controllers/signout.controller';
import { authenticateUser } from '@middlewares/authenticateUser.middleware';
import controllerWrapper from '@middlewares/controllerWrapper.middleware';
import express from 'express';
const SignoutRoute = express.Router();

SignoutRoute.post('/', controllerWrapper(authenticateUser, proceedSignout));

export default SignoutRoute;
