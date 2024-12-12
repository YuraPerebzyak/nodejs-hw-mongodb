import express from 'express';
import cors from 'cors';
import pino from 'pino-http';

import * as contactServices from './services/contacts.js';
import { getEnvVar } from './utils/getEnvVar.js';

const PORT = Number(getEnvVar('PORT', 3000));

export const setupServer = () => {
  const app = express();

  app.use(cors());
  app.use(express.json());
  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );

  app.get('/contacts', async (req, res) => {
    const contacts = await contactServices.getContact();

    res.json({
      status: 200,
      message: 'Successfully found contact',
      data: contacts,
    });
  });

  app.get('/contacts/:contactId', async (req, res) => {
    const id = req.params.contactId;

    const contact = await contactServices.getContactByID(id);

    if (!contact) {
      return res.status(404).json({
        status: 404,
        message: `Contact with ${id} not found`,
      });
    }

    res.json({
      status: 200,
      message: `Successfully found contact with id=${id}`,
      data: contact,
    });
  });

  app.use((req, res) => {
    res.status(404).json({
      message: `${req.url} Not found`,
    });
  });

  app.use((error, req, res, next) => {
    res.status(500).json({
      message: 'Server error',
      error: error.message,
    });
  });

  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
};
