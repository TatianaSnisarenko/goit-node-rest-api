import fs from "node:fs/promises";
import path from "node:path";
import { nanoid } from "nanoid";

const contactsPath = path.resolve("db", "contacts.json");

function updateContacts(contacts) {
  return fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
}

async function listContacts() {
  const data = await fs.readFile(contactsPath, "utf-8");
  return JSON.parse(data);
}

async function getContactById(contactId) {
  const contacts = await listContacts();
  const contact = contacts.find((contact) => contact.id === contactId);
  return contact || null;
}

async function removeContact(contactId) {
  const contacts = await listContacts();
  const index = contacts.findIndex((contact) => contact.id === contactId);
  if (index === -1) {
    return null;
  }
  const [removedContact] = contacts.splice(index, 1);
  await updateContacts(contacts);
  return removedContact;
}

async function addContact(data) {
  const contacts = await listContacts();
  const newContact = {
    id: nanoid(),
    ...data,
  };
  contacts.push(newContact);
  await updateContacts(contacts);
  return newContact;
}

async function updateContact(id, data) {
  const contacts = await listContacts();
  const index = contacts.findIndex((contact) => contact.id === id);
  if (index === -1) {
    return null;
  }
  contacts[index] = {
    ...contacts[index],
    ...data,
  };
  await updateContacts(contacts);
  return contacts[index];
}

export default {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
