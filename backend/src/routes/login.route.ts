import { proceedLogin, refreshUser } from '@controllers/login.controller';
import controllerWrapper from '@middlewares/controllerWrapper.middleware';
import express from 'express';
const LoginRoute = express.Router();

LoginRoute.post('/', controllerWrapper(proceedLogin));
LoginRoute.post('/refresh', controllerWrapper(refreshUser));

export default LoginRoute;
