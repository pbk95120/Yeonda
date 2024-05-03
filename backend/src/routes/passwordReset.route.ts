import { requestPasswordReset } from '@controllers/passwordReset.controller';
import express from 'express';
const PasswordResetRoute = express.Router();

PasswordResetRoute.post('/', requestPasswordReset);

export default PasswordResetRoute;
