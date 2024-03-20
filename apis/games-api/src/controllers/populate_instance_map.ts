import { NextFunction, Request, Response } from 'express';
import {
  InstanceOfGame,
  Minute,
  GameID,
  getCurrentMinute,
  IInstanceMap,
  IAllGamesMap,
} from '@aklapper/model';

import { ChutesAndLadders } from '@aklapper/ChutesAndLadders';

import ShortUniqueId from 'short-unique-id';

export const populateInstanceMaps = (
  req: Request,
  resp: Response,
  next: NextFunction
) => {
  const instanceMap = req.app.get('instanceMap') as IInstanceMap;
  const allGamesMap = req.app.get('allGamesMap') as IAllGamesMap;

  const minute: Minute = getCurrentMinute();
  const gameID: GameID = new ShortUniqueId().rnd();
  const activeInstance = new InstanceOfGame(
    minute,
    gameID,
    new ChutesAndLadders(5, 5)
  );
  allGamesMap.addGame(gameID, activeInstance);

  instanceMap.addGameInstance(minute, gameID);

  const gameIDtoSend = {
    gameID: gameID,
  };

  resp.status(200).send(gameIDtoSend);
  next();
};
