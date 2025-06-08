import contactsService from "../services/contactsServices.js";
import HttpError from "../helpers/HttpError.js";
import controllerWrapper from "../decorators/controllerWrapper.js";

const getAllContacts = async (req, res) => {
  const { id: userId } = req.user;
  const { page = 1, limit = 20, favorite } = req.query;
  const pageNum = Number(page) > 0 ? Number(page) : 1;
  const limitNum = Number(limit) > 0 ? Number(limit) : 20;
  let favoriteValue;
  if (favorite !== undefined) {
    favoriteValue = favorite === "true";
  }
  const contacts = await contactsService.listContacts(userId, {
    page: pageNum,
    limit: limitNum,
    favorite: favoriteValue,
  });
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
