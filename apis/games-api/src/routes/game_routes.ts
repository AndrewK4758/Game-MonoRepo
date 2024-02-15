import { Router } from 'express';
import {
  createGameLink,
  instanceOfGame,
  gameList,
  gameDetails,
} from '../controllers/list-games';

export class GameRoutes {
  constructor(router: Router) {
    router.get('/games', gameList);
    router.get('/games/:id', gameDetails); // this is the route the client will call the get request too once the user selects the game from the list of games
    router.get('/games/:id/session', createGameLink);
    router.get('/games/:id/session/:sessionID', instanceOfGame);
  }
}

// paste these 2 urls into your browser and watch the difference on what is returned
// http://localhost:3333/api/v1/games/
// http://localhost:3333/api/v1/games/0
// http://localhost:3333/api/v1/games/1
