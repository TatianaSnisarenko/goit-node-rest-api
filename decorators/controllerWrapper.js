import { ValidationError, UniqueConstraintError } from "sequelize";

const controllerWrapper = (controller) => {
  return async (req, res, next) => {
    try {
      await controller(req, res, next);
    } catch (error) {
      if (
        error instanceof ValidationError &&
        error.name === "SequelizeValidationError"
      ) {
        error.status = 400;
      }
      if (error instanceof UniqueConstraintError) {
        error.status = 409;
        error.massage = "Data is in use";
      }
      next(error);
    }
  };
};
export default controllerWrapper;
