import Contact from "../db/models/Contact.js";

const listContacts = (userId, { page = 1, limit = 20, favorite } = {}) => {
  const offset = (page - 1) * limit;
  const where = {
    owner: userId,
  };
  if (favorite !== undefined) {
    where.favorite = favorite;
  }
  return Contact.findAll({
    where,
    offset,
    limit,
  });
};

const getContactById = (userId, contactId) => {
  return Contact.findOne({
    where: {
      id: contactId,
      owner: userId,
    },
  });
};

const removeContact = async (userId, contactId) => {
  const contact = await getContactById(userId, contactId);
  if (!contact) {
    return null;
  }
  await contact.destroy();
  return contact;
};

const addContact = (userId, data) => {
  return Contact.create(
    { ...data, owner: userId },
    {
      returning: true,
    }
  );
};

const updateContact = async (userId, contactId, data) => {
  const contact = await getContactById(userId, contactId);
  if (!contact) {
    return null;
  }
  return contact.update(data, {
    returning: true,
  });
};

const updateStatusContact = async (userId, contactId, data) => {
  const contact = await getContactById(userId, contactId);
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
  updateStatusContact,
};
