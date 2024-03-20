import { IBoard, ISpace } from './interfaces';

export class Board implements IBoard {
  TotalSpaces: number;
  SpaceMaker;
  SpecialValueMaker;
  ConnectSpecials;

  constructor(
    totalSpaces: number,
    spaceMaker: (indexOfSpace: number) => ISpace,
    specialValueMaker: () => Set<number>,
    connectSpecials: () => void
  ) {
    this.TotalSpaces = totalSpaces;
    this.SpaceMaker = spaceMaker;
    this.ConnectSpecials = connectSpecials;
    this.SpecialValueMaker = specialValueMaker;
    this.boardSetup();
  }

  boardSetup() {
    this.SpecialValueMaker();
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
  }
}
