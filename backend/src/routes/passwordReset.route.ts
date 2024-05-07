import { confirmPasswordReset, requestPasswordReset, verifyPasswordReset } from '@controllers/passwordReset.controller';
import { controllerWrapper } from '@middlewares/controllerWrapper';
import express from 'express';
const PasswordResetRoute = express.Router();

PasswordResetRoute.post('/', controllerWrapper(requestPasswordReset));
PasswordResetRoute.post('/verify', controllerWrapper(verifyPasswordReset));
PasswordResetRoute.post('/confirm', controllerWrapper(confirmPasswordReset));

export default PasswordResetRoute;
