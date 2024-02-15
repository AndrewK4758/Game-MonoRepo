/*
This is not a production server yet!
This is only a minimal backend to get started.
*/

import express from 'express';
import * as path from 'path';
import { GameRoutes } from './routes/game_routes';
import cors from 'cors';

const app = express();
const router = express.Router();

const corsOptions = {
  origin: 'http://localhost:4200',
  optionSuccessStatus: 200,
};

// app.use(corsOptions)
app.use(
  '/assets',
  cors(corsOptions),
  express.static(path.join(__dirname, 'assets'))
);
app.use('/api/v1', cors(corsOptions), router);
new GameRoutes(router);
//new Player(router);
//new Play(router);

const port = process.env.PORT || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api/v1`);
});
server.on('error', console.error);
