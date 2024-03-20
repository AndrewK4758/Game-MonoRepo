import { Request, Response } from 'express';
import { getActiveGame } from '../utils/utils';

export const sendGameBoard = (req: Request, resp: Response) => {
  const gameID = req.header('gameID');
  const activeGame = getActiveGame(req, gameID);

  const gameBoardToSend = {
    gameBoard: activeGame.instance.displayGameBoard(),
  };

  resp.send(gameBoardToSend);
};
