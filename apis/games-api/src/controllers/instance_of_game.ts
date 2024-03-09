import { NextFunction, Request, Response } from 'express';
import {
  InstanceOfGame,
  Minute,
  GameID,
  getCurrentMinute,
  IInstanceMap,
  IAllGamesMap,
  ChutesAndLadders,
} from '@aklapper/model';

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

  req.app.set('gameID', gameID);

  resp.status(200).redirect('/api/v1/games/:id/play');
  next();
};

export const sendCreatedGameID = (
  req: Request,
  resp: Response,
  next: NextFunction
) => {
  const gameID = req.app.get('gameID');

  const gameIDtoSend = {
    gameID: gameID,
  };

  resp.status(200).send(gameIDtoSend);

  next();
};

export const specificGameFunctionality = (
  req: Request,
  resp: Response,
  next: NextFunction
) => {
  const allGamesMap = req.app.get('allGamesMap') as IAllGamesMap;
  const gameID = req.params.gameID;

  const activeGame = allGamesMap.AllGames.get(gameID);
  if (activeGame) {
    const gameDataToSend = {
      game: activeGame.instance.displayGameBoard(),
    };

    resp.status(200).send(gameDataToSend);
    next();
  } else {
    console.log('not found');
    resp.status(404).redirect('/api/v1/error');
    next();
  }
};

export const sendError = (res: Request, resp: Response) => {
  const error = {
    message: 'GAME IS NOT FOUND. PLEASE START A NEW GAME TO CONTINUE',
  };

  console.log(error);
  resp.send(error);
};