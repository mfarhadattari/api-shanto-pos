/* eslint-disable no-console */
import { Server } from 'http';
import mongoose from 'mongoose';
import app from './app';
import { config } from './config';
let server: Server;
// -------->> bootstrap server function <<----------------
const bootstrap = async () => {
  try {
    // listing app
    server = app.listen(config.port, () => {
      console.log(`[Server] Server listening 🤖`);
    });

    //   connecting database
    await mongoose.connect(config.db_uri as string).then(() => {
      console.log(`[Server] Database connected 🚀`);
    });
  } catch (error) {
    console.dir(error);
  }
};

bootstrap();

// -------->> handling unhandled and uncaught error <<----------------
process.on('unhandledRejection', () => {
  console.log(`[Server] Unhandled Rejection is detected,  shutting down...⚡`);
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
});

process.on('uncaughtException', () => {
  console.log(`[Server] Uncaught Exception is detected, shutting down...⚡`);
  process.exit(1);
});
