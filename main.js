import 'dotenv/config';
import http from 'http';
import app from './server/server.js';
import { initializeDatabase } from './server/models/index.js';
import listEndpoints from 'express-list-endpoints';

const PORT = process.env.PORT || 5000;
const server = http.createServer(app);

const start = async () => {
  try {
    await initializeDatabase();
    if(process.env.ENV == "dev"){
      console.log("=====================================================");
      listEndpoints(app).forEach((route) => {
        route.methods.forEach((method) => {
          console.log(`[ROUTE] : ${method} ${route.path}`);
        });
      });
      console.log("=====================================================");
    };
    server.listen(PORT, () => {
      console.log(`🚀 [SERVER] is running on port http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log(`⚠️ [ERROR], ${error}`);
  }
};

start();
