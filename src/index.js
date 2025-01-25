import { setupServer } from './server.js';
import { initMongoConnection } from './db/initMongoConnection.js';

import { createDirIfNotExist } from './utils/createDirIfNotExist.js';

import { TEMPLATES_DIR, UPLOADS_DIR } from './constants/index.js';

const boostrap = async () => {
  await createDirIfNotExist(TEMPLATES_DIR);
  await createDirIfNotExist(UPLOADS_DIR);
  await initMongoConnection();
  setupServer();
};

boostrap();
