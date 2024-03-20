// TEST CASES FOR SPACE MODULE

import { Space } from '../ts/space';
import { Avatar } from '../ts/avatar';
import { IAvatar, ISpace, SpaceType, Color } from '../ts/interfaces';

// Setup of spaces & avatars
let s1: ISpace,
  Ladder: ISpace,
  s3: ISpace,
  s4: ISpace,
  s5: ISpace,
  s6: ISpace,
  s7: ISpace,
  s8: ISpace,
  Chute: ISpace,
  s10: ISpace,
  avatar1: IAvatar,
  avatar2: IAvatar,
  cur: ISpace;

beforeEach(() => {
  s1 = new Space(SpaceType.START, 1);
  Ladder = new Space(SpaceType.LADDER, 2);
  s3 = new Space(SpaceType.NORMAL, 3);
  s4 = new Space(SpaceType.NORMAL, 4);
  s5 = new Space(SpaceType.NORMAL, 5);
  s6 = new Space(SpaceType.NORMAL, 6);
  s7 = new Space(SpaceType.NORMAL, 7);
  s8 = new Space(SpaceType.NORMAL, 8);
  Chute = new Space(SpaceType.CHUTE, 9);
  s10 = new Space(SpaceType.FINISH, 10);

  s1.next = Ladder;
  Ladder.next = s3;
  Ladder.special = s5;
  s3.next = s4;
  s4.next = s5;
  s5.next = s6;
  s6.next = s7;
  s7.next = s8;
  s8.next = Chute;
  Chute.next = s10;
  Chute.special = s3;

  Ladder.previous = s1;
  s3.previous = Ladder;
  s4.previous = s3;
  s5.previous = s4;
  s6.previous = s5;
  s7.previous = s6;
  s8.previous = s7;
  Chute.previous = s8;
  s10.previous = Chute;

  avatar1 = new Avatar('Test Car', Color.RED);
  avatar2 = new Avatar('Test Hat', Color.BLACK);
  s1.land(avatar1);
  s1.land(avatar2);

  cur = s1;
});

describe('Connectivity and functionality of space.js', () => {
  test('Test for #Next of Spaces', () => {
    while (cur) {
      expect(cur).not.toBeNull();
      expect(cur).toBeInstanceOf(Space);
      cur = cur.next;
    }
  });

  test('Test for #Type of Spaces', () => {
    while (cur) {
      expect(cur.type).not.toBeUndefined();
      cur = cur.next;
    }
  });

  test('Test for #Special of Spaces', () => {
    while (cur) {
      if (cur.type === SpaceType.CHUTE || cur.type === SpaceType.LADDER)
        expect(cur.special).not.toBeNull();
      cur = cur.next;
    }
  });
});

describe('Test of move function starting from beginning space and #Players array', () => {
  test('Test Special Space and Occupied method', () => {
    expect(s1.avatarsInSpace.length === 2).toBeTruthy();
    expect(s1.occupied).toBeTruthy();
    avatar1.move(1);
    avatar2.move(1);
    expect(s1.avatarsInSpace.length === 0).toBeTruthy();
    expect(avatar1.location).toEqual(s6);
    expect(avatar2.location).toEqual(s5);
    expect(s5.avatarsInSpace.length === 1).toBeTruthy();
    expect(s5.occupied).toBeTruthy();
    expect(s6.avatarsInSpace.length === 1).toBeTruthy();
    expect(s6.occupied).toBeTruthy();
  });
  test('Move 2 Spaces, land, leave, occupied and previous', () => {
    expect(s1.avatarsInSpace.length === 2).toBeTruthy();
    expect(s1.occupied).toBeTruthy();
    avatar1.move(3);
    avatar2.move(5);
    expect(s1.avatarsInSpace.length === 0).toBeTruthy();
    expect(avatar1.location).toEqual(s4);
    expect(s4.avatarsInSpace.length === 1).toBeTruthy();
    expect(s4.occupied).toBeTruthy();
    expect(avatar2.location).toBe(s6);
    expect(s6.avatarsInSpace.length === 1).toBeTruthy();
    expect(s6.occupied).toBeTruthy();
  });

  test('Test move function of avatar to not permit the avatar to leave the space if it will exceed the remaining spaces', () => {
    avatar1.move(20);
    expect(avatar1.location).toBe(s1);

    avatar1.move(-20);
    expect(avatar1.location).toBe(s1);
  });

  test('Test Previous', () => {
    while (cur.next) {
      cur = cur.next;
      expect(cur.previous).not.toBeNull();
      expect(cur.previous).toBeInstanceOf(Space);
    }
  });

  test('Backwards movement of avatar', () => {
    avatar1.move(5);
    avatar1.move(-2);
    expect(avatar1.location === s4).toBeTruthy();

    avatar2.move(8);
    avatar2.move(-1);
    expect(avatar2.location === s5).toBeTruthy();
  });

  describe('Test of User Defined Input Methods', () => {
    test('Test Avatar Name and Color / Space Value', () => {
      expect(avatar1.color).toBe(Color.RED);
      expect(avatar2.color).toBe(Color.BLACK);
      expect(avatar1.name).toBe('Test Car');
      expect(avatar2.name).toBe('Test Hat');
      expect(s1.value).toBe('1');
    });
  });
});
