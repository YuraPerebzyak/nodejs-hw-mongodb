import ContactCollection from '../db/models/contact.js';

import { calcPaginationData } from '../utils/calcPaginationData.js';

export const getContacts = async ({
  page = 1,
  perPage = 10,
  sortBy = '_id',
  sortOrder = 'asc',
  filter = {},
}) => {
  const limit = perPage;
  const skip = (page - 1) * limit;
  const contactsQuery = ContactCollection.find(); // отримуємо об'єкт запиту

  if (filter.type) {
    contactsQuery.where('contactType').equals(filter.type);
  }

  if (filter.isFavourite) {
    contactsQuery.where('isFavourite').equals(filter.isFavourite);
  }

  if (filter.userId) {
    contactsQuery.where('userId').equals(filter.userId);
  }

  const totalItems = await ContactCollection.find()
    .merge(contactsQuery)
    .countDocuments(); // countDocuments повертає загальну кількість обєктів

  const data = await contactsQuery
    .skip(skip)
    .limit(limit) // пропусти перші skip об'єкта і поверни наступні limit
    .sort({ [sortBy]: sortOrder });

  const paginationData = calcPaginationData({ totalItems, page, perPage });

  return {
    data,
    ...paginationData,
  };
};

export const getContactById = (id) => ContactCollection.findById(id);

export const getContact = (filter) => ContactCollection.findOne(filter);

export const addContact = (contactData) =>
  ContactCollection.create(contactData);

export const updateContact = async (filter, contactData, options = {}) => {
  const { upsert = false } = options;
  const contact = await ContactCollection.findOneAndUpdate(
    filter,
    contactData,
    {
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
