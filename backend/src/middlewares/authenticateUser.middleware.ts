import { Controller } from '@schemas/controller.schema';
import { getLogonFromToken } from '@utils/getLogonFromToken';

export const authenticateUser: Controller = async (req, res, next) => {
  const token = req.cookies['access-token'];
  const decoded = getLogonFromToken(token, false);
  req.body.user_id = decoded.user_id;
  req.body.email = decoded.email;
  return;
};
