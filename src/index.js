import { initMongoCollectionDB } from './db/initMongoCollectionDB.js';
import { setupServer } from './server.js';

const boostrap = async () => {
  await initMongoCollectionDB();
  setupServer();
};

boostrap();
// gbaqDM3OC3qzLDen
// cluster0.cauyo.mongodb.net
