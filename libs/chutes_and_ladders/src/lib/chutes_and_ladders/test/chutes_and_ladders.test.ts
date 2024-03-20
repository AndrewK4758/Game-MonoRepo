import {
  ChutesAndLadders,
  MAX_SPECIAL_DISTANCE,
} from '../ts/chutes_and_ladders';
import { Space } from '../ts/space';
import { Die } from '../ts/die';
import { IAvatar, IDie, IPlayer, ISpace, SpaceType } from '../ts/interfaces';

let game: ChutesAndLadders,
  cur: ISpace,
  avatar1: IAvatar,
  avatar2: IAvatar,
  die: IDie,
  rollValue: number,
  player1: IPlayer,
  player2: IPlayer;

beforeEach(() => {
  game = new ChutesAndLadders(5, 5);

  cur = game.startSpace;

  player1 = game.registerPlayer('Player1');
  game.registerAvatar(player1, game.avatarList[1].name, game.colorList.RED);

  player2 = game.registerPlayer('Player2');
  game.registerAvatar(player2, game.avatarList[2].name, game.colorList.BLACK);

  avatar1 = player1.avatar;
  avatar2 = player2.avatar;

  game.setOrderAndStart();

  die = new Die(6);
  rollValue = die.roll();
});

describe('Test connectivity of spaces within Board', () => {
  it('Test Next method of all Spaces', () => {
    while (cur) {
      expect(cur).not.toBeNull();
      expect(cur).toBeInstanceOf(Space);
      cur = cur.next;
    }
  });

  it('SpaceType Start', () => {
    expect(cur.type).toBe(SpaceType.START);
  });
  it('Test Previous method', () => {
    expect(cur.previous).toBeNull();
    expect(cur.next.previous.type).toBe(SpaceType.START);
  });

  it('SpaceType Start', () => {
    expect(cur.type).toBe(SpaceType.START);
  });

  it('SpaceType Finish', () => {
    while (cur.next) {
      cur = cur.next;
    }
    expect(cur.type).toBe(SpaceType.FINISH);
  });

  it('Space.Special', () => {
    while (cur) {
      if (cur.special) {
        expect(cur.special).not.toBeNull();
        expect(cur.special).toBeInstanceOf(Space);
      }
      cur = cur.next;
    }
  });

  it('SpaceType Chute', () => {
    while (cur) {
      if (cur.type === SpaceType.CHUTE) {
        cur.land(avatar1);
        expect(cur.special).not.toBeNull();
        expect(cur.special).toBeInstanceOf(Space);
        break;
      }
      cur = cur.next;
    }
  });
  //
  it('SpaceType Ladder', () => {
    while (cur) {
      if (cur.type === SpaceType.LADDER) {
        cur.land(avatar2);
        expect(cur.special).not.toBeNull();
        expect(cur.special).toBeInstanceOf(Space);
        break;
      }
      cur = cur.next;
    }
  });

  it('Avatar position / space recognition after Die roll method', () => {
    avatar1.move(rollValue);
    while (rollValue > 0) {
      cur = cur.next;
      rollValue--;
    }
    if (cur.type === SpaceType.NORMAL) {
      expect(avatar1.location === cur).toBeTruthy();
      expect(avatar1.location.occupied === cur.occupied).toBeTruthy();
    }
  });

  it('Test distance of chute or ladder is >= 40', () => {
    while (cur) {
      if (cur.type === SpaceType.CHUTE && cur.special) {
        expect(
          Math.abs(Number(cur.value) - Number(cur.special.value)) <=
            MAX_SPECIAL_DISTANCE
        ).toBeTruthy();
      }
      cur = cur.next;
    }
  });

  it('reset', () => {
    game.reset();
    expect(game.readyToPlay).toBeFalsy();
    expect(game.haveWinner).toBeFalsy();
    expect(game.currentPlayer === 0).toBeTruthy();
    expect(avatar1.location.type === SpaceType.START).toBeTruthy();
    expect(avatar2.location.type === SpaceType.START).toBeTruthy();
  });
});
