import dotenv from 'dotenv';
import path from 'path';

dotenv.config({
  path: path.join(process.cwd(), '.env'),
});

export const config = {
  node_env: process.env.NODE_ENV,
  app_name: process.env.APP_NAME,
  port: process.env.PORT,
  db_uri: process.env.DB_URI,
  default_password: process.env.DEFAULT_PASSWORD,
  bcrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET,
  refresh_token_secret: process.env.REFRESH_TOKEN_SECRET,
  access_token_expires: process.env.ACCESS_TOKEN_EXPIRES,
  refresh_token_expires: process.env.REFRESH_TOKEN_EXPIRES,
  client_base_url: process.env.CLIENT_BASE_URL,
  nodemailer_host: process.env.NODEMAILER_HOST,
  nodemailer_port: process.env.NODEMAILER_PORT,
  nodemailer_user: process.env.NODEMAILER_USER,
  nodemailer_password: process.env.NODEMAILER_PASS,
};
