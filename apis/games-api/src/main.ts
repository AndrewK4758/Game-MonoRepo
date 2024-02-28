/*
This is not a production server yet!
This is only a minimal backend to get started.
*/

import express, { NextFunction, Request, Response } from 'express';
import * as path from 'path';
import { GameRoutes } from './routes/game_routes';
import cors from 'cors';
import { InstanceMap } from './controllers/instance_map';

const app = express();
const router = express.Router();

const corsOptions = {
  origin: 'http://localhost:4200',
  optionSuccessStatus: 200,
};

export interface X extends Request {
  instanceMap: InstanceMap;
}

app.use(cors(corsOptions));
app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use((req: X, resp: Response, next: NextFunction) => {
  const instanceMap = new InstanceMap();
  req.instanceMap = instanceMap;
  next();
});
app.use('/api/v1', router);
new GameRoutes(router);


const port = process.env.PORT || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api/v1`);
});
server.on('error', console.error);
