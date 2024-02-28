import { NextFunction, Request, Response } from 'express';
import { getCurrentMinute } from './instance_map';
import { InstanceOfGame } from '@aklapper/model';
import ShortUniqueId from 'short-unique-id';
import { X } from '../main';

const instanceOfGame = (req: X, resp: Response, next: NextFunction) => {
  const instanceMap = req.instanceMap;

  console.log(instanceMap, 'instance map');
  const activeGameInstances = new Map<string, InstanceOfGame>();

  const game = new InstanceOfGame();
  const gameID = new ShortUniqueId().rnd();

  // const minute = getCurrentMinute();

  activeGameInstances.set(gameID, game);

  req.params.game = gameID;
  console.log(req.params);
  // const p1 = game.game.registerPlayer('ak');
  // game.game.registerAvatar(
  //   p1,
  //   game.game.avatarList[1].name,
  //   game.game.colorList.BLACK
  // );

  // const p2 = game.game.registerPlayer('ak');
  // game.game.registerAvatar(
  //   p2,
  //   game.game.avatarList[2].name,
  //   game.game.colorList.RED
  // );

  // game.game.setOrderAndStart();

  // game.game.takeTurn();
  // game.game.takeTurn();
  // game.game.takeTurn();
  // game.game.takeTurn();
  // game.game.takeTurn();

  const dataToSend = {
    game: game.game.displayGameBoard(),
    activeGameID: gameID,
    instanceTime: game.instanceTime,
    lastActive: game.lastActive,
  };

  // GameInstanceMap.instanceMap.forEach((e) => console.log(e));
  // console.log(minute);

  resp.send(dataToSend);
  next();
};
export { instanceOfGame };
