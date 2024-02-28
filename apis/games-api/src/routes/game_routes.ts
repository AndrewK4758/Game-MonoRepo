import { Router } from 'express';
import { gameList, gameDetails } from '../controllers/list-games';
import { instanceOfGame } from '../controllers/instance_of_game';

export class GameRoutes {
  constructor(router: Router) {
    router.get('/games', gameList);
    router.get('/games/:id', gameDetails); // this is the route the client will call the get request too once the user selects the game from the list of games
    router.get('/games/:id/instances', instanceOfGame);
  }
}

