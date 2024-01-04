/* eslint-disable no-console */
import mongoose from 'mongoose';
import app from './app';
import { config } from './config';

// -------->> bootstrap server function <<----------------
const bootstrap = async () => {
  try {
    // listing app
    app.listen(config.port, () => {
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
