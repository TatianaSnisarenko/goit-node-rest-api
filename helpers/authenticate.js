import HttpError from "./HttpError.js";
import { verifyToken } from "./jwt.js";
import { findUser } from "../services/authServices.js";

const authenticate = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return next(HttpError(401, "Not authorized"));
  }

  const [bearer, token] = authorization.split(" ");

  if (bearer !== "Bearer" || !token) {
    return next(HttpError(401, "Not authorized"));
  }
  const { payload, error } = verifyToken(token);
  if (error) {
    return next(HttpError(401, "Not authorized"));
  }
  const user = await findUser({ id: payload.id });
  if (!user) {
    return next(HttpError(401, "Not authorized"));
  }

  if (!user.token || user.token !== token) {
    return next(HttpError(401, "Not authorized"));
  }
  req.user = user;
  next();
};

export default authenticate;
