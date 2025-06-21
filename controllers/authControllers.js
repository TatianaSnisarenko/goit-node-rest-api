import controllerWrapper from "../decorators/controllerWrapper.js";
import * as authService from "../services/authServices.js";
import fs from "node:fs/promises";
import path from "node:path";
import gravatar from "gravatar";

const avatarDir = path.resolve("public", "avatars");

async function saveAvatarFile(req) {
  const { path: oldPath, filename } = req.file;
  const newPath = path.join(avatarDir, filename);
  await fs.rename(oldPath, newPath);
  const avatarURL = path.join("avatars", filename);
  return avatarURL;
}

const register = async (req, res) => {
  let avatarURL = null;
  if (req.file) {
    avatarURL = await saveAvatarFile(req);
  } else {
    avatarURL = gravatar.url(req.body.email, { s: "250", d: "retro" }, true);
  }

  const newUser = await authService.registerUser({ ...req.body, avatarURL });

  res.status(201).json({
    user: {
      email: newUser.email,
      subscription: newUser.subscription,
      avatarURL: newUser.avatarURL,
    },
  });
};

const login = async (req, res) => {
  const { token, user } = await authService.loginUser(req.body);
  res.status(200).json({
    token,
    user: {
      email: user.email,
      subscription: user.subscription,
    },
  });
};

const getCurrentUser = async (req, res) => {
  const { email, subscription } = req.user;
  res.json({
    email,
    subscription,
    avatarURL: req.user.avatarURL || null,
  });
};

const logout = async (req, res) => {
  const { id } = req.user;
  await authService.logoutUser(id);
  res.status(204).send();
};

const updateUserSubscription = async (req, res) => {
  const { id } = req.user;
  const { subscription } = req.body;
  const updatedUser = await authService.updateSubscription(id, subscription);
  res.json({
    email: updatedUser.email,
    subscription: updatedUser.subscription,
  });
};

const updateAvatar = async (req, res) => {
  const { id } = req.user;
  const avatarURL = await saveAvatarFile(req);
  await authService.updateAvatarURL(id, avatarURL);
  res.status(200).json({ avatarURL });
};

export default {
  register: controllerWrapper(register),
  login: controllerWrapper(login),
  getCurrentUser: controllerWrapper(getCurrentUser),
  logout: controllerWrapper(logout),
  updateUserSubscription: controllerWrapper(updateUserSubscription),
  updateAvatar: controllerWrapper(updateAvatar),
};
