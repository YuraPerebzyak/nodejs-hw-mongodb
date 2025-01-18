import { Router } from 'express';

import * as contactsController from '../controllers/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const contactsRouter = Router();

contactsRouter.get('/', ctrlWrapper(contactsController.getHomePageController));

contactsRouter.get(
  '/contacts',
  ctrlWrapper(contactsController.getContactsController),
);

contactsRouter.get(
  '/contacts/:id',
  ctrlWrapper(contactsController.getContactsByIdController),
);

contactsRouter.post(
  '/contacts',
  ctrlWrapper(contactsController.addContactController),
);

contactsRouter.put(
  '/contacts/:id',
  ctrlWrapper(contactsController.upsertContactController),
);

contactsRouter.patch(
  '/contacts/:id',
  ctrlWrapper(contactsController.patchContactController),
);

contactsRouter.delete(
  '/contacts/:id',
  ctrlWrapper(contactsController.deleteContactController),
);

export default contactsRouter;
