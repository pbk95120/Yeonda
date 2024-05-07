import { confirmPasswordReset, requestPasswordReset, verifyPasswordReset } from '@controllers/passwordReset.controller';
import express from 'express';
import { controllerWrapper } from './../middlewares/controllerWrapper';
const PasswordResetRoute = express.Router();

PasswordResetRoute.post('/', controllerWrapper(requestPasswordReset));
PasswordResetRoute.post('/verify', controllerWrapper(verifyPasswordReset));
PasswordResetRoute.post('/confirm', controllerWrapper(confirmPasswordReset));

export default PasswordResetRoute;
