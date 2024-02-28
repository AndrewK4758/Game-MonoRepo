import { Color, IAvatar, ISpace } from './interfaces';

export class Avatar implements IAvatar {
  Name: string;
  Color: Color;
  Location!: ISpace;
  constructor(name: string, color: Color) {
    this.Name = name;
    this.Color = color;
    this.Location;
  }

  get name() {
    return this.Name;
  }

  get color() {
    return this.Color;
  }

  get location() {
    return this.Location;
  }

  set location(location: ISpace) {
    this.Location = location;
  }

  move(numberOfSpaces: number): void {
    const locBeforeMove: ISpace = this.location;
    const locAfterMove: ISpace | null =
      numberOfSpaces > 0
        ? this._moveForward(numberOfSpaces)
        : this._moveBackward(Math.abs(numberOfSpaces));

    if (locAfterMove) {
      locBeforeMove.leave();
      locAfterMove.land(this);
    }
  }

  _moveForward(numberOfSpaces: number) {
    let avatarCurLocation: ISpace = this.Location;
    while (numberOfSpaces > 0) {
      if (!avatarCurLocation.next) return null;
      else avatarCurLocation = avatarCurLocation.next;
      numberOfSpaces--;
    }
    return avatarCurLocation;
  }

  _moveBackward(numberOfSpaces: number) {
    let avatarCurLocation: ISpace = this.Location;
    while (numberOfSpaces > 0) {
      if (!avatarCurLocation.previous) return null;
      else avatarCurLocation = avatarCurLocation.previous;
      numberOfSpaces--;
    }
    return avatarCurLocation;
  }
}
