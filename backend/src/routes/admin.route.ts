import express from 'express';
import { getStatistic, getAnalysis } from '@controllers/admin.controller';
import { authenticateUser } from '@middlewares/authenticateUser';
import { controllerWrapper } from '@middlewares/controllerWrapper';
const AdminRoute = express.Router();
AdminRoute.use(express.json());

AdminRoute.get('/statistic', controllerWrapper(authenticateUser, getStatistic));
AdminRoute.get('/analysis', controllerWrapper(authenticateUser, getAnalysis));

export default AdminRoute;
