import 'dotenv/config';
import http from 'http';
import app from './server/server.js';
import { initializeDatabase } from './server/models/index.js';

const PORT = process.env.PORT || 5000;
const server = http.createServer(app);

const start = async () => {
  try {
    await initializeDatabase();

    server.listen(PORT, () => {
      console.log(`🚀 [SERVER] is running on port http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log(`⚠️ [ERROR], ${error}`);
  }
};

start();
