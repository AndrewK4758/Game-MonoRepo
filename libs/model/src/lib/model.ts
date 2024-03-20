// ASK ABOUT DIRECTORY STRUCTURE BEST PRACTICE

import {
  IAvatarList,
  ChutesAndLadders,
  Color,
} from '@aklapper/ChutesAndLadders';

export interface IRule {
  order: number;
  title?: string;
  value: string;
}

export interface IRuleBuilder {
  setOrder(order: number): IRuleBuilder;
  setValue(value: string): IRuleBuilder;
  setTitle(title: string): IRuleBuilder;
  build(): IRule;
}

export class Rule {
  private rule: IRule;
  constructor() {
    this.rule = new Object() as IRule;
  }
  setOrder(order: number): IRuleBuilder {
    this.rule.order = order;
    return this;
  }
  setValue(value: string): IRuleBuilder {
    if (value) {
      value = value.replace(/[\n|\r] +/g, ' ');
    }
    this.rule.value = value;
    return this;
  }
  setTitle(title: string): IRuleBuilder {
    this.rule.title = title;
    return this;
  }
  build(): IRule {
    return this.rule;
  }
}

//-----------------------------------------------------------------------------------------------------------------//
// GAME BUILDER

export interface IGame {
  id: string;
  name: string;
  description?: string;
  imageURL?: string;
  rules: IRule[];
}

export interface IGameBuilder {
  seId(id: string): IGameBuilder;
  setName(name: string): IGameBuilder;
  setDescription(description: string): IGameBuilder;
  setImageURL(imageURL: string): IGameBuilder;
  setRule(order: number, value: string, title: string): IGameBuilder;
  build(): IGame;
}

export class GameBuilder implements IGameBuilder {
  private Game: IGame;
  constructor() {
    this.Game = new Object() as IGame;
    this.Game.rules = [];
  }

  seId(id: string): IGameBuilder {
    this.Game.id = id;
    return this;
  }

  setName(name: string): IGameBuilder {
    this.Game.name = name;
    return this;
  }

  setDescription(description: string): IGameBuilder {
    this.Game.description = description;
    return this;
  }

  setImageURL(imageURL: string): IGameBuilder {
    this.Game.imageURL = imageURL;
    return this;
  }

  setRule(order: number, title: string, value: string): IGameBuilder {
    const rule = new Rule()
      .setOrder(order)
      .setValue(value)
      .setTitle(title)
      .build();
    this.Game.rules.push(rule);
    return this;
  }

  build(): IGame {
    const gameBuildComplete = Object.assign(new Object(), this.Game);
    this.Game = {} as IGame;
    this.Game.rules = [];
    return gameBuildComplete;
  }
}

//-------------------------------------------------------------------------------------------------------------------
// Type declarations

export type Minute = number;

export type GameID = string;

export type GamesInMinute = GameID[];

export const getCurrentMinute = (): Minute =>
  (new Date().getHours() * 60 + new Date().getMinutes()) as Minute;

//------------------------------------------------------------------------------------------------------------------
// Game instance map

export interface IInstanceOfGame {
  gameID: GameID;
  instanceTime: Minute;
  lastActive: Minute;
  instance: ChutesAndLadders;
  updateLastActive(minute: Minute): void;
}

export class InstanceOfGame implements IInstanceOfGame {
  gameID: GameID;
  instanceTime: Minute;
  lastActive: Minute;
  instance: ChutesAndLadders;
  constructor(minute: Minute, gameID: GameID, instance: ChutesAndLadders) {
    this.instanceTime = minute;
    this.lastActive = minute;
    this.gameID = gameID;
    this.instance = instance;
  }

  updateLastActive(minute: Minute): void {
    // GET THE CURRENT MINUTE OF THE DAY
    this.lastActive = minute;
  }
}

//----------------------------------------------------------------------------------
// Map of all active games

export interface IAllGamesMap {
  AllGames: Map<GameID, InstanceOfGame>;
  addGame(gameID: GameID, game: InstanceOfGame): void;
}

export class AllGamesMap implements IAllGamesMap {
  AllGames: Map<GameID, InstanceOfGame>;
  constructor() {
    this.AllGames = new Map<GameID, InstanceOfGame>();
  }

  addGame(gameID: GameID, game: InstanceOfGame) {
    this.AllGames.set(gameID, game);
  }
}

//-----------------------------------------------------------------------------------
// Map of all game instances in what minute

export interface IInstanceMap {
  Map: Map<Minute, GamesInMinute>;
  addGameInstance(minute: Minute, gameID: GameID): void;
}

export class InstanceMap implements IInstanceMap {
  Map: Map<Minute, GamesInMinute>;
  constructor() {
    this.Map = new Map<Minute, GamesInMinute>();
    for (let i = 0; i < 24 * 60; i++) {
      this.Map.set(i, []);
    }
    this.Map.set(2000, []);
  }

  addGameInstance(minute: Minute, gameID: GameID): void {
    this.Map.get(minute)?.push(gameID);
  }
}

export const reaper = (instanceMap: IInstanceMap) => {
  const now = new Date();
  const startTime = new Date(now.getTime() + 24 * 60 * 60 * 1000);

  setTimeout(() => {
    let previousDay = instanceMap.Map.get(2000);
    previousDay = [];

    setInterval(() => {
      const minute = getCurrentMinute();
      let valsToMove = instanceMap.Map.get(minute);
      if (valsToMove) {
        previousDay.push(...valsToMove);
        valsToMove = [];
      }
    }, 60 * 1000);
  }, startTime.getTime() - now.getTime());
};

// console.log(reaper())
//--------------------------------------------------------------------------------------------------------
//ReturnGameFunctionallityLoaderData interface

export interface RegisterAndPlayData {
  gameID: string;
  avatarList: IAvatarList[];
  avatarColorList: Color;
}
