import { Controller } from '@schemas/controller.schema';
import http from 'http-status-codes';

export const proceedLogout: Controller = async (req, res, next) => {
  res.clearCookie('access-token');
  res.sendStatus(http.OK);
};
