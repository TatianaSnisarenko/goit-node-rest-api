import Contact from "../db/models/Contact.js";

const listContacts = () => Contact.findAll();

const getContactById = (contactId) => Contact.findByPk(contactId);

const removeContact = async (contactId) => {
  const contact = await Contact.findByPk(contactId);
  if (!contact) {
    return null;
  }
  await contact.destroy();
  return contact;
};

const addContact = (data) => Contact.create(data);

const updateContact = async (id, data) => {
  const contact = await getContactById(id);
  if (!contact) {
    return null;
  }
  return contact.update(data, {
    returning: true,
  });
};

export default {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
