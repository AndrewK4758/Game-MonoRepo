import { NextFunction, Request, Response } from 'express';
import { getActiveGame } from '../utils/utils';

export const instanceDataForRegister = (
  req: Request,
  resp: Response,
  next: NextFunction
) => {
  const gameID = req.header('gameID');

  console.log(gameID);
  const activeGame = getActiveGame(req, gameID);
  if (activeGame) {
    const gameDataToSend = {
      gameID: gameID,
      avatarList: activeGame.instance.avatarList,
      avatarColorList: activeGame.instance.colorList,
    };

    resp.status(200).send(gameDataToSend);
    next();
  } else {
    console.log('not found');
    const error = {
      error: 'GAME IS NOT FOUND. PLEASE START A NEW GAME TO CONTINUE',
    };
    resp.send(error);
    next();
  }
};
