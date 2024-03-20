import { Request, Response } from 'express';
import { getActiveGame } from '../utils/utils';

export const registerPlayerAvatarAndFilter = (req: Request, resp: Response) => {
  const gameID = req.header('gameID');
  const activeGame = getActiveGame(req, gameID);
  const { playerName, avatarName, avatarColor } = req.body;

  const player1 = activeGame.instance.registerPlayer(playerName);

  activeGame.instance.registerAvatar(player1, avatarName, avatarColor);

  activeGame.instance.avatarList = activeGame.instance.avatarList.filter(
    (a) => a.name !== avatarName
  );

  console.log(activeGame.instance.playersArray);
  resp.sendStatus(200);
};
