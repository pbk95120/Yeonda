import { proceedLogin } from '@controllers/login.controller';
import controllerWrapper from '@middlewares/controllerWrapper';
import express from 'express';
const LoginRoute = express.Router();

LoginRoute.post('/', controllerWrapper(proceedLogin));

export default LoginRoute;
