import { initMongoCollectionDB } from './db/initMongoCollectionDB.js';
import { setupServer } from './server.js';

const boostrap = async () => {
  await initMongoCollectionDB();
  setupServer();
};

boostrap();
