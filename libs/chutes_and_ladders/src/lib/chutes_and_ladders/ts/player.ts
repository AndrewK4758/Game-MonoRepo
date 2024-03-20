import { IAvatar, IPlayer } from './interfaces';

export class Player implements IPlayer {
  Name: string;
  Order!: number;
  Avatar!: IAvatar;
  constructor(name: string) {
    this.Name = name;
    this.Order;
    this.Avatar;
  }

  get name(): string {
    return this.Name;
  }

  get order(): number {
    return this.Order;
  }

  set order(order) {
    this.Order = order;
  }

  get avatar(): IAvatar {
    return this.Avatar;
  }

  set avatar(avatar) {
    this.Avatar = avatar;
  }
}
