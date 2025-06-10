import express from "express";
import contactsController from "../controllers/contactsControllers.js";

import validateBody from "../helpers/validateBody.js";
import {
  createContactSchema,
  updateContactSchema,
  updateStatusContactSchema,
} from "../schemas/contactsSchemas.js";
import authenticate from "../helpers/authenticate.js";

const contactsRouter = express.Router();
contactsRouter.use(authenticate);

contactsRouter.get("/", contactsController.getAllContacts);

contactsRouter.get("/:id", contactsController.getOneContact);

contactsRouter.delete("/:id", contactsController.deleteContact);

contactsRouter.post(
  "/",
  validateBody(createContactSchema),
  contactsController.createContact
);

contactsRouter.put(
  "/:id",
  validateBody(updateContactSchema),
  contactsController.updateContact
);

contactsRouter.patch(
  "/:contactId/favorite",
  validateBody(updateStatusContactSchema),
  contactsController.updateStatusContact
);

export default contactsRouter;
