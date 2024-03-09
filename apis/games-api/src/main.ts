import express from 'express';
import * as path from 'path';
import { GameRoutes } from './routes/game_routes';
import cors from 'cors';
import { InstanceMap, AllGamesMap } from '@aklapper/model';

const app = express();
const router = express.Router();

const corsOptions = {
  origin: 'http://localhost:4200',
  optionSuccessStatus: 200,
};

app.set('instanceMap', new InstanceMap());
app.set('allGamesMap', new AllGamesMap());
app.use(cors(corsOptions));
app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use('/api/v1', router);
new GameRoutes(router);

const port = process.env.PORT || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api/v1`);
});
server.on('error', console.error);
