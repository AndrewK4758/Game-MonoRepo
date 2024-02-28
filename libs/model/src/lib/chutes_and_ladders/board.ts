import { IBoard, ISpace } from './interfaces';

export class Board implements IBoard {
  TotalSpaces: number;
  SpaceMaker;
  SpecialValuesMaker;
  ConnectSpecials;
  constructor(
    totalSpaces: number,
    spaceMaker: (indexOfSpace: number) => ISpace,
    specialValuesMaker: (min?: number, max?: number) => void | Set<number>,
    connectSpecials: () => void
  ) {
    this.TotalSpaces = totalSpaces;
    this.SpaceMaker = spaceMaker;
    this.SpecialValuesMaker = specialValuesMaker;
    this.ConnectSpecials = connectSpecials;
    this.boardSetup();
  }

  boardSetup() {
    this.SpecialValuesMaker();
    let space = this.SpaceMaker(this.TotalSpaces);
    for (
      let indexOfSpace = this.TotalSpaces - 1;
      indexOfSpace > 0;
      indexOfSpace--
    ) {
      space.previous = this.SpaceMaker(indexOfSpace);
      space.previous.next = space;
      space = space.previous;
    }
    this.ConnectSpecials();
    return space;
  }
}
