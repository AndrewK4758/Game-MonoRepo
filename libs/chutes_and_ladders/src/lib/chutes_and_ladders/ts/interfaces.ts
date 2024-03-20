export enum Color {
  RED = 'Red',
  WHITE = 'White',
  BLUE = 'Blue',
  GREEN = 'Green',
  PURPLE = 'Purple',
  YELLOW = 'Yellow',
  ORANGE = 'Orange',
  PINK = 'Pink',
  BLACK = 'Black',
  BROWN = 'Brown',
}

export enum SpaceType {
  START = 0,
  NORMAL = 1,
  CHUTE = 2,
  LADDER = 3,
  FINISH = 4,
}

export interface IAvatarList {
  id: number;
  name: string;
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
  get color(): Color;
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
  boardSetup(): void;
}

export interface IDie {
  get sides(): number;
  roll(): number;
}

export interface ISummedRoll {
  get rollValues(): number[];
  get sum(): number;
}
