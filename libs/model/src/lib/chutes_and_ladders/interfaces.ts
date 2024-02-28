export enum Color {
  UNDEFINED = 0,
  RED = 1,
  BLACK = 2,
  BROWN = 3,
  BLUE = 4,
  GREEN = 5,
  PURPLE = 6,
  WHITE = 7,
  YELLOW = 8,
  ORANGE = 9,
  PINK = 10,
}

export const enum SpaceType {
  START = 0,
  NORMAL = 1,
  CHUTE = 2,
  LADDER = 3,
  FINISH = 4,
}

export interface IPlayer {
  get name(): string;
  get order(): number;
  set order(order: number);
  get avatar(): IAvatar;
  set avatar(avatar: IAvatar);
}

export interface IAvatar {
  get name(): string;
  get location(): ISpace;
  set location(location: ISpace);
  move(numberOfSpaces: number): void;
}

export interface ISpace {
  avatarsInSpace: IAvatar[];

  get value(): string;
  get type(): SpaceType;
  get previous(): ISpace;
  set previous(previous: ISpace);
  get next(): ISpace;
  set next(next: ISpace);
  get special(): ISpace | null;
  set special(special: ISpace);
  get occupied(): boolean;

  land(avatar: IAvatar): void;
  leave(): void;
  ifOccupied(): void;
}

export interface IBoard {
  boardSetup(): ISpace;
}

export interface IDie {
  get sides(): number;
  roll(): number;
}

export interface ISummedRoll {
  get rollValues(): number[];
  get sum(): number;
}
