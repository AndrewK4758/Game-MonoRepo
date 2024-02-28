// RULE BUILDER

import { ChutesAndLadders } from './chutes_and_ladders/chutes_and_ladders';

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

//------------------------------------------------------------------------------------------------------------------
// Game instance map

export interface IInstanceOfGame {
  game: ChutesAndLadders;
  instanceTime: number;
  lastActive: number;
  updateLastActive(): void;
}

const date = new Date();
const getCurrentMinute = () => date.getHours() * 60 + date.getMinutes();

export class InstanceOfGame implements IInstanceOfGame {
  game: ChutesAndLadders;
  instanceTime: number;
  lastActive: number;
  constructor() {
    this.game = new ChutesAndLadders(5, 5);
    this.instanceTime = getCurrentMinute();
    this.lastActive = this.instanceTime;
  }

  updateLastActive(): void {
    // GET THE CURRENT MINUTE OF THE DAY
    this.lastActive = getCurrentMinute();
  }
}

//----------------------------------------------------------------------------------
// Instance Map of games made in what minute




