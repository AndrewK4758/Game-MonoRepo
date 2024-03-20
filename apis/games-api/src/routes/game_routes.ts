import express, { Router } from 'express';
import { sendGameList } from '../controllers/send_game_list';
import { sendGameDetails } from '../controllers/send_game_details';
import { populateInstanceMaps } from '../controllers/populate_instance_map';
import { instanceDataForRegister } from '../controllers/instance_data_for_register';
import { registerPlayerAvatarAndFilter } from '../controllers/register_data_filter';
import { sendGameBoard } from '../controllers/send_game_board';

export class GameRoutes {
  constructor(router: Router) {
    router.get('/games', sendGameList);
    router.get('/games/:name', sendGameDetails);
    router.post('/games/:name', populateInstanceMaps);
    router.get('/games/:name/play', instanceDataForRegister);
    router.use('/games/:name/play', express.json());
    router.post('/games/:name/play', registerPlayerAvatarAndFilter);
    router.get('/games/:name/play/board', sendGameBoard); // This will have other functionality as well
  }
}
