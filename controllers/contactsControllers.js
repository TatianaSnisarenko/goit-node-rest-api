import contactsService from "../services/contactsServices.js";
import HttpError from "../helpers/HttpError.js";

export const getAllContacts = async (req, res) => {
  const contacts = await contactsService.listContacts();
  res.json({ status: "success", code: 200, data: { contacts } });
};

export const getOneContact = async (req, res, next) => {
  const { id } = req.params;
  const contact = await contactsService.getContactById(id);

  if (!contact) {
    return next(HttpError(404, "Not found"));
  }

  res.json({ status: "success", code: 200, data: { contact } });
};

export const deleteContact = async (req, res, next) => {
  const { id } = req.params;
  const contact = await contactsService.deleteContact(id);

  if (!contact) {
    return next(HttpError(404, "Not found"));
  }

  res.json({ status: "success", code: 200, data: { contact } });
};

export const createContact = async (req, res) => {
  const newContact = await contactsService.addContact(req.body);
  res.status(201).json({ status: "success", code: 201, data: { newContact } });
};

export const updateContact = async (req, res, next) => {
  const { id } = req.params;
  const updatedContact = await contactsService.updateContact(id, req.body);

  if (!updatedContact) {
    return next(HttpError(404, "Not found"));
  }

  res.json({ status: "success", code: 200, data: { updatedContact } });
};
