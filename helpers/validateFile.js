import HttpError from "./HttpError.js";

const validateFile = async (req, res, next) => {
  if (!req.file) {
    return next(HttpError(400, "No file uploaded"));
  }
  next();
};

export default validateFile;
