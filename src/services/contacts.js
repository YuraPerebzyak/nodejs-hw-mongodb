import ContactCollection from '../db/models/Contact.js';

export const getContacts = () => ContactCollection.find();

export const getContactById = (id) => ContactCollection.findById(id);

export const addContact = (contactData) =>
  ContactCollection.create(contactData);

export const updateContact = async (_id, contactData, options = {}) => {
  const { upsert = false } = options;
  const contact = await ContactCollection.findOneAndUpdate(
    {
      _id,
    },
    contactData,
    {
      new: true,
      upsert,
      includeResultMetadata: true,
    },
  );

  const isNew = Boolean(contact.lastErrorObject.upserted);

  if (!contact || !contact.value) return null;

  return {
    isNew,
    data: contact.value,
  };
};

export const deleteContact = async (id) =>
  ContactCollection.findOneAndDelete(id);

// export const deleteContact = (id) => ContactCollection.findByIdAndDelete(id);
