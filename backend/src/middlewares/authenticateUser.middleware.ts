import { Controller } from '@schemas/controller.schema';
import { getEmailFromToken } from '@utils/getEmailFromToken';

export const authenticateUser: Controller = async (req, res, next) => {
  const token = req.cookies['access-token'];
  const decoded = await getEmailFromToken(token);
  req.body.user_id = decoded.user_id;
  req.body.email = decoded.email;
  return;
};
