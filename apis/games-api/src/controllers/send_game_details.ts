import { Request, Response } from 'express';
import { games } from './list-games';

export const sendGameDetails = (req: Request, resp: Response) => {
  const selectedGameID = req.params.name;
  const selectedGame = games.find(({ name }) => name === selectedGameID);
  const selectedGameDetails = new Object({
    name: selectedGame.name,
    rules: selectedGame.rules,
  });
  resp.status(200).json(selectedGameDetails);
};
