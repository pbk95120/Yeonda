import { Controller } from '@schemas/controller.schema';

export const controllerWrapper = (handler: Controller) => async (req, res, next) => {
  try {
    await handler(req, res, next);
  } catch (error) {
    next(error);
  }
};

export default controllerWrapper;
