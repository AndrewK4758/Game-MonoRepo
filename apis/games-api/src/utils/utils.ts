import { Request } from 'express';
import { IAllGamesMap } from '@aklapper/model';

export const getActiveGame = (req: Request, gameID: string) => {
  const allGamesMap = req.app.get('allGamesMap') as IAllGamesMap;
  return allGamesMap.AllGames.get(gameID);
};
