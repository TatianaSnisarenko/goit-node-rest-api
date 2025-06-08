import controllerWrapper from "../decorators/controllerWrapper.js";
import * as authService from "../services/authServices.js";

const register = async (req, res) => {
  const newUser = await authService.registerUser(req.body);

  res.status(201).json({
    user: {
      email: newUser.email,
      subscription: newUser.subscription,
    },
  });
};

const login = async (req, res) => {
  const { token, user } = await authService.loginUser(req.body);
  res.json({
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

export default {
  register: controllerWrapper(register),
  login: controllerWrapper(login),
  getCurrentUser: controllerWrapper(getCurrentUser),
  logout: controllerWrapper(logout),
  updateUserSubscription: controllerWrapper(updateUserSubscription),
};
