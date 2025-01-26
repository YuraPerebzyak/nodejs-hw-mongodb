import createError from 'http-errors';

import * as contactServices from '../services/contacts.js';

import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';
import { parseContactFilterParams } from '../utils/filters/parseContactFilterParams.js';

import { sortByList } from '../db/models/contact.js';

export const getHomePageController = (req, res) => {
  res.send('<h1>Home Page</h1>');
};

export const getContactsController = async (req, res) => {
  const { page, perPage } = parsePaginationParams(req.query);
  const { sortBy, sortOrder } = parseSortParams(req.query, sortByList);
  const filter = parseContactFilterParams(req.query);
  filter.userId = req.user._id;

  const data = await contactServices.getContacts({
    page,
    perPage,
    sortBy,
    sortOrder,
    filter,
  });

  res.json({
    status: 200,
    message: 'Successfully found contacts!',
    data,
  });
};

export const getContactsByIdController = async (req, res) => {
  const { _id: userId } = req.user;
  const { id: _id } = req.params;
  const contact = await contactServices.getContact({ _id, userId });

  if (!contact) {
    throw createError(404, `Contact with id=${_id} not found`);
    // const error = new Error(`Contact with id=${id} not found`);
    // error.status = 404;
    // throw error;
  }

  res.json({
    status: 200,
    message: `Successfully found contact with id=${_id}!`,
    data: contact,
  });
};

export const addContactController = async (req, res) => {
  const { _id: userId } = req.user;
  const contact = await contactServices.addContact({ ...req.body, userId });

  res.status(201).json({
    status: 201,
    message: 'Successfully created a contact!',
    data: contact,
  });
};

export const upsertContactController = async (req, res) => {
  const { id } = req.params;
  const { _id: userId } = req.user;
  const { isNew, data } = await contactServices.updateContact(
    id,
    { ...req.body, userId },
    {
      upsert: true,
    },
  );

  const status = isNew ? 201 : 200;

  res.status(status).json({
    status,
    massage: 'Successfully upserte contact',
    data,
  });
};

export const patchContactController = async (req, res) => {
  const { id: _id } = req.params;
  const { _id: userId } = req.user;
  const contact = await contactServices.updateContact(
    { _id, userId },
    req.body,
  );

  if (!contact) {
    throw createError(404, `Contact with id=${_id} not found`);
  }

  res.json({
    status: 200,
    massage: 'Successfully upserte contact',
    data: contact.data,
  });
};

export const deleteContactController = async (req, res) => {
  // const contact = await contactServices.deleteContact(req.params.id);

  const { id: _id } = req.params;
  const { _id: userId } = req.user;
  const contact = await contactServices.deleteContact({ _id, userId });

  if (!contact) {
    // throw createError(404, `Contact not found`);
    throw createError(404, `Contact with id=${_id} not found`);
  }

  res.sendStatus(204);
};
