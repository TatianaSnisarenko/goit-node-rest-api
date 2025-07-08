import bcrtypt from "bcrypt";
import User from "../db/models/User.js";
import HttpError from "../helpers/HttpError.js";
import { generateToken } from "../helpers/jwt.js";
import { nanoid } from "nanoid";
import sendEmail from "../helpers/sendEmail.js";

const { BASE_URL } = process.env;

const createVerificationEmail = (verificationToken, email) => {
  return {
    to: email,
    subject: "Please, verify your email",
    html: `<a target="_blank" href="${BASE_URL}/api/auth/verify/${verificationToken}">Click to verify your email</a>`,
  };
};

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
  const verificationToken = nanoid();
  const newUser = await User.create({
    ...userData,
    password: hashedPassword,
    verificationToken,
  });

  await sendEmail(createVerificationEmail(verificationToken, email));

  return newUser;
};

export const verifyEmail = async (verificationToken) => {
  const user = await findUser({ verificationToken });
  if (!user) {
    throw HttpError(404, "Not found");
  }
  return await user.update(
    { verify: true, verificationToken: null },
    { returning: true }
  );
};

export const resendVerificationEmail = async (email) => {
  const user = await findUser({ email });
  if (!user) {
    throw HttpError(404, "Not found");
  }
  if (user.verify) {
    throw HttpError(400, "Verification has already been passed");
  }

  await sendEmail(createVerificationEmail(user.verificationToken, email));
};

export const loginUser = async (userData) => {
  const { email, password } = userData;
  const existingUser = await findUser({ email });
  if (!existingUser) {
    throw HttpError(401, "Email or password is wrong");
  }
  if (!existingUser.verify) {
    throw HttpError(401, "Email not verified");
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

export const updateAvatarURL = async (userId, avatarURL) => {
  const user = await findUser({ id: userId });
  if (!user) {
    throw HttpError(404, "Not found");
  }
  await user.update({ avatarURL });
  return user;
};
