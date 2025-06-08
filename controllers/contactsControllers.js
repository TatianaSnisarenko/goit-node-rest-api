import contactsService from "../services/contactsServices.js";
import HttpError from "../helpers/HttpError.js";
import controllerWrapper from "../decorators/controllerWrapper.js";

const getAllContacts = async (req, res) => {
  const { id: userId } = req.user;
  const contacts = await contactsService.listContacts(userId);
  res.json(contacts);
};

const getOneContact = async (req, res) => {
  const { id } = req.params;
  const { id: userId } = req.user;
  const contact = await contactsService.getContactById(userId, id);

  if (!contact) {
    throw HttpError(404, "Not found");
  }

  res.json(contact);
};

const deleteContact = async (req, res) => {
  const { id } = req.params;
  const { id: userId } = req.user;
  const contact = await contactsService.removeContact(userId, id);

  if (!contact) {
    throw HttpError(404, "Not found");
  }

  res.json(contact);
};

const createContact = async (req, res) => {
  const { id: userId } = req.user;
  const newContact = await contactsService.addContact(userId, req.body);
  res.status(201).json(newContact);
};

const updateContact = async (req, res) => {
  const { id } = req.params;
  const { id: userId } = req.user;
  const updatedContact = await contactsService.updateContact(
    userId,
    id,
    req.body
  );

  if (!updatedContact) {
    throw HttpError(404, "Not found");
  }

  res.json(updatedContact);
};

const updateStatusContact = async (req, res) => {
  const { contactId } = req.params;
  const { id: userId } = req.user;
  const updatedContact = await contactsService.updateStatusContact(
    userId,
    contactId,
    req.body
  );

  if (!updatedContact) {
    throw HttpError(404, "Not found");
  }

  res.json(updatedContact);
};

export default {
  getAllContacts: controllerWrapper(getAllContacts),
  getOneContact: controllerWrapper(getOneContact),
  deleteContact: controllerWrapper(deleteContact),
  createContact: controllerWrapper(createContact),
  updateContact: controllerWrapper(updateContact),
  updateStatusContact: controllerWrapper(updateStatusContact),
};
