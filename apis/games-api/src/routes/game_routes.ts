import { Router } from 'express';
import { sendGameList, sendGameDetails } from '../controllers/list-games';
import {
  populateInstanceMaps,
  sendCreatedGameID,
  specificGameFunctionality,
  sendError,
} from '../controllers/instance_of_game';

// specificGameInstance,
export class GameRoutes {
  constructor(router: Router) {
    router.use('/error', sendError);
    router.get('/games', sendGameList);
    router.get('/games/:name', sendGameDetails); // this is the route the client will call the get request too once the user selects the game from the list of games
    router.post('/games/:name', populateInstanceMaps);
    router.get('/games/:name/play', sendCreatedGameID);
    router.get('/games/:name/play/:gameID', specificGameFunctionality);
  }
}

