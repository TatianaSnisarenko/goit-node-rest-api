import { ValidationError } from "sequelize";

const controllerWrapper = (controller) => {
  return async (req, res, next) => {
    try {
      await controller(req, res, next);
    } catch (error) {
      if (error instanceof ValidationError) {
        error.status = 400;
      }
      next(error);
    }
  };
};
export default controllerWrapper;
