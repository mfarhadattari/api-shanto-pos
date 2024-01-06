import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import { config } from './config';
import globalErrorHandler from './middlewares/globalErrorHandler';
import notFound from './middlewares/notFound';
import router from './route';

// ------------->> Initialization Application <<-----------
const app: Application = express();

// ------------>> Application Parsers <<----------------
app.use(
  cors({
    origin: config.client_base_url,
    optionsSuccessStatus: 200,
  }),
);
app.use(express.json());
app.use(cookieParser());

// -------------->> Application Routes <<----------------
app.use('/api', router);

// -------------->> Application Rote Route <<----------------
app.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: 'ShantoPOS Server is running.',
    data: {
      name: 'api-shanto-pos',
      description: 'Backend service of ShantoPOS',
      repo: 'https://github.com/mfarhadattari/api-shanto-pos.git',
      author: {
        name: 'Mohammad Farhad',
        email: 'mfarhad.dev@gmail.com',
        portfolio: 'https://mfarhad-dev.vercel.app',
        github: 'https://github.com/mfarhadattari',
      },
    },
  });
});

// --------------->> Global Error Handler <<--------------------
app.use(globalErrorHandler);

// --------------->> Not Found Handler <<--------------------
app.use(notFound);

export default app;
