import bcrtypt from "bcrypt";
import User from "../db/models/User.js";
import HttpError from "../helpers/HttpError.js";
import { generateToken } from "../helpers/jwt.js";

export const findUser = (query) =>
  User.findOne({
    where: query,
  });

export const registerUser = async (userData) => {
  const { email, password } = userData;
  const existingUser = await User.findOne({ where: { email } });
  if (existingUser) {
    throw HttpError(409, "Email in use");
  }
  const hashedPassword = await bcrtypt.hash(password, 10);
  return User.create({ ...userData, password: hashedPassword });
};

export const loginUser = async (userData) => {
  const { email, password } = userData;
  const existingUser = await User.findOne({ where: { email } });
  if (!existingUser) {
    throw HttpError(401, "Email or password is wrong");
  }
  const isPasswordValid = await bcrtypt.compare(
    password,
    existingUser.password
  );
  if (!isPasswordValid) {
    throw HttpError(401, "Email or password is wrong");
  }

  const token = generateToken({
    id: existingUser.id,
  });

  await existingUser.update({ token });

  return {
    token,
    user: existingUser,
  };
};

export const logoutUser = async (userId) => {
  const user = await findUser({ id: userId });
  if (!user || !user.token) {
    throw HttpError(404, "Not found");
  }
  await user.update({ token: null });
};

export const updateSubscription = async (userId, subscription) => {
  const user = await findUser({ id: userId });
  if (!user) {
    throw HttpError(404, "Not found");
  }
  await user.update({ subscription });
  return user;
};
