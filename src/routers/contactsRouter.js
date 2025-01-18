// import express from 'express';
import { Router } from 'express';

import * as contactsController from '../controllers/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../utils/validateBody.js';
import {
  contactAddSchema,
  contactUpdateSchema,
} from '../validation/contacts.js';
import { isValidId } from '../middlewares/isValidId.js';

// const app = express();
const contactsRouter = Router();

contactsRouter.get('/', ctrlWrapper(contactsController.getHomePageController));

contactsRouter.get(
  '/contacts',
  ctrlWrapper(contactsController.getContactsController),
);

contactsRouter.get(
  '/contacts/:id',
  isValidId,
  ctrlWrapper(contactsController.getContactsByIdController),
);

contactsRouter.post(
  '/contacts',
  validateBody(contactAddSchema),
  ctrlWrapper(contactsController.addContactController),
);

contactsRouter.put(
  '/contacts/:id',
  isValidId,
  validateBody(contactAddSchema),
  ctrlWrapper(contactsController.upsertContactController),
);

contactsRouter.patch(
  '/contacts/:id',
  isValidId,
  validateBody(contactUpdateSchema),
  ctrlWrapper(contactsController.patchContactController),
);

contactsRouter.delete(
  '/contacts/:id',
  isValidId,
  ctrlWrapper(contactsController.deleteContactController),
);

export default contactsRouter;
