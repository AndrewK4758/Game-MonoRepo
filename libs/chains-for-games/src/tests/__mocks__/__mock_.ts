import { Request, Response } from 'express';
import { IRegisterFormValues, GamePlayerValidation, InstanceOfGame } from '@aklapper/model';
import { Color, Player, Avatar } from '@aklapper/chutes-and-ladders';

export const mockReqObj: Partial<Request> = {
  body: {
    playerName: 'Player Name',
    avatarName: 'XENOMORPH',
    avatarColor: Color.BLACK,
  } as IRegisterFormValues,

  header: jest.fn().mockImplementation((name: string) => {
    const headers = new Map<string, string>();
    const __current_game__ = {
      gameInstanceID: 'game-ID',
      playerID: 'player-2-ID',
    } as GamePlayerValidation;

    headers.set('__current_game__', JSON.stringify(__current_game__));

    return headers.get(name);
  }),
};

export const mockRespObj: Partial<Response> = {
  setHeader: jest.fn().mockImplementation((name: string, headerValue: string) => {
    const headers = new Map<string, string>();

    headers.set(name, headerValue);
  }),
  status: jest.fn().mockImplementation((result) => {
    mockRespObj.status = result;
    return mockRespObj;
  }),
  sendStatus: jest.fn().mockImplementation((result) => (mockRespObj.status = result)),
  json: jest.fn().mockImplementation((result) => (mockRespObj.json = result)),
};

export const mockAddPlayersToGame = (game: InstanceOfGame) => {
  game.instance.playersArray[0] = new Player('player1', 'player-1-ID');
  game.instance.playersArray[0].order = 1;
  game.instance.playersArray[0].avatar = new Avatar('XENOMORPH', Color.BLACK);
  game.instance.playersArray[1] = new Player('player2', 'player-2-ID');
  game.instance.playersArray[1].order = 2;
  game.instance.playersArray[1].avatar = new Avatar('PREDATOR', Color.RED);
};
