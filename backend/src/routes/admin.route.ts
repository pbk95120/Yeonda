import { getAnalysis, getStatistic } from '@controllers/admin.controller';
import { authenticateUser } from '@middlewares/authenticateUser.middleware';
import { controllerWrapper } from '@middlewares/controllerWrapper.middleware';
import express from 'express';
const AdminRoute = express.Router();
AdminRoute.use(express.json());

AdminRoute.get('/statistic', controllerWrapper(authenticateUser, getStatistic));
AdminRoute.get('/analysis', controllerWrapper(authenticateUser, getAnalysis));

export default AdminRoute;
