import { getAnalysis, getStatistic } from '@controllers/adminUser.controller';
import { authenticateUser } from '@middlewares/authenticateUser.middleware';
import { controllerWrapper } from '@middlewares/controllerWrapper.middleware';
import express from 'express';
const AdminUserRoute = express.Router();
AdminUserRoute.use(express.json());

AdminUserRoute.get('/statistic', controllerWrapper(authenticateUser, getStatistic));
AdminUserRoute.get('/analysis', controllerWrapper(authenticateUser, getAnalysis));

export default AdminUserRoute;
