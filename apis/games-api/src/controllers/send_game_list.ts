import { Request, Response } from 'express';
import { games } from './list-games';

export const sendGameList = (req: Request, resp: Response) => {
  const gamesNameAndIdArr = games.map(
    (game) =>
      new Object({ name: game.name, id: game.id, imageURL: game.imageURL })
  );
  resp.status(200).json(gamesNameAndIdArr);
};
