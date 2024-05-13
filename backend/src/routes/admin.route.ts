import express from 'express';
import { getStatistic } from '@controllers/admin.controller';
import { authenticateUser } from '@middlewares/authenticateUser';
import { controllerWrapper } from '@middlewares/controllerWrapper';
const AdminRoute = express.Router();
AdminRoute.use(express.json());

AdminRoute.get('/statistic', controllerWrapper(authenticateUser, getStatistic));

export default AdminRoute;
