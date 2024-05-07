import { proceedLogout } from '@controllers/logout.controller';
import express from 'express';
const LogoutRoute = express.Router();

LogoutRoute.post('/', proceedLogout);

export default LogoutRoute;
