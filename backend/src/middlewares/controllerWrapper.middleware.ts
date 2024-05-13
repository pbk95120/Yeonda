import { Controller } from '@schemas/controller.schema';

export const controllerWrapper =
  (...handlers: Controller[]) =>
  async (req, res, next) => {
    try {
      for (const handler of handlers) {
        await handler(req, res, next);
      }
    } catch (error) {
      next(error);
    }
  };

export default controllerWrapper;
