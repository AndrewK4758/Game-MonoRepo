import { Player } from './player';
import { Board } from './board';
import { Avatar } from './avatar';
import { Space } from './space';
import { SpaceType, Color, ISpace, IPlayer } from './interfaces';
import { Die } from './die';
import { rangeSelector, generateRandomNumber } from './utils';

const TOTAL_SPACES = 100;
const START = 1;
const ROWS: number = Math.ceil(TOTAL_SPACES / Math.sqrt(TOTAL_SPACES));
const MAX_SPECIAL_DISTANCE = 40;
const DIE: Die = new Die(6);
const MAX_PLAYERS = 4;
const MIN_PLAYERS = 2;
const uniqueSpecialValues = new Set<number>();
const specials: [ISpace, number][] = [];
let chuteCount = 0;
let ladderCount = 0;

function checkIfSpecialSpace(indexOfSpace: number) {
  return uniqueSpecialValues.has(indexOfSpace);
}

function specialSpaceSelector(indexOfSpace: number) {
  let type: SpaceType;
  const row = rowFinder(indexOfSpace);
  if (chuteCount === ladderCount || row === ROWS - 1) {
    type = SpaceType.CHUTE;
    chuteCount++;
  } else {
    type = SpaceType.LADDER;
    ladderCount++;
  }
  return new Space(type, indexOfSpace);
}

function minSpecialRangeValue() {
  return (ROWS - 1) ** 2 + 1;
}

const connectSpecials = () => {
  let space, index;

  for (let i = 0; i < specials.length; i++) {
    [space, index] = specials[i];

    if (space.type === SpaceType.CHUTE) {
      const distToTraverseChute = createDumpValueChute(index);
      space.special = connectChute(distToTraverseChute, space);
    }
    if (space.type === SpaceType.LADDER) {
      const distToTraverseLadder = createDumpValueLadder(index);
      space.special = connectLadder(distToTraverseLadder, space);
    }
  }
};

const createDumpValueChute = (indexOfSpace: number) => {
  const maxValForRand =
    indexOfSpace > MAX_SPECIAL_DISTANCE ? MAX_SPECIAL_DISTANCE : indexOfSpace;
  const minDist = indexOfSpace % ROWS === 1 ? 1 : indexOfSpace % ROWS;
  const distToTraverseChute = rangeSelector(minDist, maxValForRand);
  const dumpValueChute = indexOfSpace - distToTraverseChute;
  if (checkIfSpecialSpace(dumpValueChute)) {
    createDumpValueChute(indexOfSpace);
  } else return distToTraverseChute;
  return distToTraverseChute;
};

const createDumpValueLadder = (indexOfSpace: number) => {
  const maxValForRand =
    TOTAL_SPACES - indexOfSpace > MAX_SPECIAL_DISTANCE
      ? MAX_SPECIAL_DISTANCE
      : TOTAL_SPACES - indexOfSpace;
  const minDist = ROWS - (indexOfSpace % ROWS) + 1;
  const distToTraverseLadder = rangeSelector(minDist, maxValForRand);
  const dumpValueLadder = indexOfSpace + distToTraverseLadder;
  if (checkIfSpecialSpace(dumpValueLadder)) {
    createDumpValueLadder(indexOfSpace);
  } else return distToTraverseLadder;
  return distToTraverseLadder;
};

const connectChute = (distToTraverseChute: number, space: ISpace): ISpace => {
  while (distToTraverseChute > 0) {
    space = space.previous;
    distToTraverseChute--;
  }
  return space.type === SpaceType.NORMAL ? space : space.next;
};

const connectLadder = (distToTraverseLadder: number, space: ISpace): ISpace => {
  while (distToTraverseLadder > 0) {
    space = space.next;
    distToTraverseLadder--;
  }
  return space.type === SpaceType.NORMAL ? space : space.previous;
};

function rowFinder(indexOfSpace: number) {
  return Math.floor(indexOfSpace / ROWS);
}

function resortPlayerOrderInPlayersArray(playersArray: IPlayer[]) {
  return playersArray.sort((a, b) => {
    return a.order - b.order;
  });
}

export { specials, TOTAL_SPACES, MAX_SPECIAL_DISTANCE };

export class ChutesAndLadders {
  CHUTES: number;
  LADDERS: number;
  startSpace!: ISpace;
  colorList: typeof Color;
  playersArray: IPlayer[];
  currentPlayer: number;
  playerInTurn!: IPlayer;
  readyToPlay: boolean;
  haveWinner: boolean;
  player!: IPlayer;
  avatarList: { id: number; name: string }[];
  /**
   *
   * @param {Number} chutes number of chutes
   * @param {Number} ladders number of ladders
   */

  constructor(chutes: number, ladders: number) {
    this.CHUTES = chutes;
    this.LADDERS = ladders;
    this.makeGameBoard();
    this.startSpace;
    this.playersArray = [];
    this.colorList = Color;
    this.currentPlayer = 0;
    this.readyToPlay = false;
    this.haveWinner = false;
    this.playerInTurn;
    this.player;
    this.avatarList = [
      { id: 0, name: '' },
      { id: 1, name: 'XENOMORPH' },
      { id: 2, name: 'PREDATOR' },
      { id: 3, name: 'TERMINATOR' },
      { id: 4, name: 'ROBOCOP' },
    ];
  }

  spaceMaker = (indexOfSpace: number) => {
    let space: ISpace;
    if (indexOfSpace === TOTAL_SPACES) {
      space = new Space(SpaceType.FINISH, 'Finish');
    } else if (indexOfSpace === START) {
      space = new Space(SpaceType.START, 'Start');
      this.startSpace = space;
    } else if (checkIfSpecialSpace(indexOfSpace)) {
      space = specialSpaceSelector(indexOfSpace);
      specials.push([space, indexOfSpace]);
    } else {
      space = new Space(SpaceType.NORMAL, indexOfSpace);
    }
    return space;
  };

  makeGameBoard() {
    uniqueSpecialValues.clear();
    return new Board(
      TOTAL_SPACES,
      this.spaceMaker,
      this.specialValuesMaker,
      connectSpecials
    );
  }

  displayGameBoard() {
    let space = this.startSpace;
    let row: string[] = [];
    const gameBoard: string[][] = [];
    let indexOfSpace = 1;
    while (space) {
      const rowCount = rowFinder(indexOfSpace);
      if (space.occupied) row.push(space.avatarsInSpace[0].name);
      else if (space.type === SpaceType.CHUTE) row.push('CHUTE');
      else if (space.type === SpaceType.LADDER) row.push('LADDER');
      else row.push(space.value);

      if (row.length === ROWS) {
        row = rowCount % 2 !== 0 ? row : row.reverse();
        gameBoard.push(row);
        row = [];
      }
      indexOfSpace++;
      space = space.next;
    }
    return gameBoard.reverse();
  }

  specialValuesMaker = (
    min: number = minSpecialRangeValue(),
    max: number = TOTAL_SPACES
  ): Set<number> | void => {
    if (uniqueSpecialValues.size >= this.CHUTES + this.LADDERS) return;
    const specialValue = rangeSelector(min, max);
    if (uniqueSpecialValues.has(specialValue))
      this.specialValuesMaker(min, max);
    else {
      uniqueSpecialValues.add(specialValue);
      this.specialValuesMaker(min - (ROWS - 1), max - (ROWS - 1));
    }
    return uniqueSpecialValues;
  };

  registerPlayer(name: string) {
    this.player = new Player(name);
    this.generatePlayerOrder(this.player);
    return this.player;
  }

  generatePlayerOrder(player: IPlayer) {
    const unshiftOrPush = generateRandomNumber(2);
    if (unshiftOrPush === 1) this.playersArray.push(player);
    if (unshiftOrPush === 2) this.playersArray.unshift(player);
  }

  registerAvatar(player: IPlayer, name: string, color: Color) {
    player.avatar = new Avatar(name, color);
  }

  verifyReadyToPlay() {
    return (this.readyToPlay =
      this.playersArray.length >= MIN_PLAYERS &&
      this.playersArray.length <= MAX_PLAYERS &&
      this.haveWinner === false
        ? true
        : false);
  }

  setOrderAndStart() {
    if (this.verifyReadyToPlay()) {
      this.playersArray.forEach((player, idx) => {
        player.order = idx + 1;
        this.startSpace.land(player.avatar);
      });
      this.playerInTurn = this.playersArray[this.currentPlayer];
    }
  }

  takeTurn() {
    const moveDist = DIE.roll();
    this.playerInTurn.avatar.move(moveDist);
    if (this.wonGame(this.playerInTurn.avatar.location.type)) {
      this.haveWinner = true;
      return alert(`CONGRADULATIONS ${this.playerInTurn.name}... YOU WON!!!!`);
    } else {
      this.playerInTurn = this.rotatePlayers();
    }
  }

  rotatePlayers() {
    this.currentPlayer++;
    if (this.currentPlayer === this.playersArray.length) this.currentPlayer = 0;
    return this.playersArray[this.currentPlayer];
  }

  wonGame(locationType: SpaceType) {
    return locationType === SpaceType.FINISH;
  }
  reset() {
    uniqueSpecialValues.clear();
    this.makeGameBoard();
    this.playersArray.forEach((player) => {
      player.avatar.location.leave();
      this.startSpace.land(player.avatar);
    });
    this.readyToPlay = false;
    this.haveWinner = false;
    this.currentPlayer = 0;
    resortPlayerOrderInPlayersArray(this.playersArray);
    return this.displayGameBoard();
  }
}
