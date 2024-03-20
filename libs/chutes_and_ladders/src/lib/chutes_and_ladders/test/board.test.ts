import { Board } from '../ts/board';
import { Space } from '../ts/space';
import { ISpace, SpaceType } from '../ts/interfaces';

const spaceMaker = () => {
  return new Space(SpaceType.NORMAL, '1');
};

let space: ISpace, board;

beforeEach(() => {
  board = new Board(
    100,
    spaceMaker,
    () => new Set([0]),
    () => 0
  );
  space = board.boardSetup();
});

describe('Test connection of spaces within the boardSetup method', () => {
  test('test traversing entire list', () => {
    while (space) {
      expect(space).not.toBeNull();
      expect(space).toBeInstanceOf(Space);
      space = space.next;
    }
  });

  test('test traversing entire list backwards', () => {
    while (space.next) {
      space = space.next;
      expect(space.previous).not.toBeNull();
      expect(space.previous).toBeInstanceOf(Space);
    }
  });
});
