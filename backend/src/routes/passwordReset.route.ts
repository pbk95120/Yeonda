import { confirmPasswordReset, requestPasswordReset, verifyPasswordReset } from '@controllers/passwordReset.controller';
import { authenticateUser } from '@middlewares/authenticateUser';
import { controllerWrapper } from '@middlewares/controllerWrapper';
import express from 'express';
const PasswordResetRoute = express.Router();

PasswordResetRoute.post('/', controllerWrapper(requestPasswordReset));
PasswordResetRoute.post('/verify', controllerWrapper(verifyPasswordReset));
PasswordResetRoute.post('/confirm', controllerWrapper(authenticateUser, confirmPasswordReset));

export default PasswordResetRoute;
