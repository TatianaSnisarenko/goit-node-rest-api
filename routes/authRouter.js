import express from "express";
import {
  authSchema,
  updateSubscriptionSchema,
} from "../schemas/authSchemas.js";
import validateBody from "../helpers/validateBody.js";
import authController from "../controllers/authControllers.js";
import authenticate from "../helpers/authenticate.js";

const authRouter = express.Router();

authRouter.post("/register", validateBody(authSchema), authController.register);
authRouter.post("/login", validateBody(authSchema), authController.login);
authRouter.get("/current", authenticate, authController.getCurrentUser);
authRouter.post("/logout", authenticate, authController.logout);
authRouter.patch(
  "/subscription",
  authenticate,
  validateBody(updateSubscriptionSchema),
  authController.updateUserSubscription
);

export default authRouter;
