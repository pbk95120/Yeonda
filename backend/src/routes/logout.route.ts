import { proceedLogout } from '@controllers/logout.controller';
import { controllerWrapper } from '@middlewares/controllerWrapper';
import express from 'express';
const LogoutRoute = express.Router();

LogoutRoute.post('/', controllerWrapper(proceedLogout));

export default LogoutRoute;
