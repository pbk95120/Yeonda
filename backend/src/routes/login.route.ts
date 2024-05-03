import { proceedLogin } from '@controllers/login.controller';
import express from 'express';
const LoginRoute = express.Router();

LoginRoute.post('/', proceedLogin);

export default LoginRoute;
