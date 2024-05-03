import { requestPasswordReset, verifyPasswordReset } from '@controllers/passwordReset.controller';
import express from 'express';
const PasswordResetRoute = express.Router();

PasswordResetRoute.post('/', requestPasswordReset);
PasswordResetRoute.post('/verify', verifyPasswordReset);

export default PasswordResetRoute;
