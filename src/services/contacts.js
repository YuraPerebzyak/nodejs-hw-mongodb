import contactsCollection from '../db/models/contact.js';

export const getContact = async () => {
  const contacts = await contactsCollection.find();
  return contacts;
};

export const getContactByID = async (id) => {
  const contact = await contactsCollection.findById(id);
  return contact;
};
