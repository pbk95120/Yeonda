import { Controller } from '@schemas/controller.schema';
import { getEmailFromToken } from '@utils/getEmailFromToken';

export const authenticateUser: Controller = async (req, res, next) => {
  const token = req.cookies['access-token'];
  req.body.email = await getEmailFromToken(token);
  next();
};
