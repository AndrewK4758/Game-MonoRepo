import { ContextBuilder, Context } from '@aklapper/chain';
import { InstanceOfGame, getCurrentMinute, TurnStatus, GameContextKeys } from '@aklapper/model';
import { mockReqObj, mockRespObj, mockAddPlayersToGame } from './__mocks__/__mock_';
import { ChutesAndLadders, Player, Game, SpaceType } from '@aklapper/chutes-and-ladders';
import { takeTurn, verifyPlayer, rollDice, moveAvatar, wonGame, rotatePlayer } from '../index';

interface ICtxOutput {
  message: TurnStatus;
}

let ctx: Context, game: InstanceOfGame, output: ICtxOutput, turnStatus: TurnStatus;

describe('should execute all steps of taking turn', () => {
  beforeAll(() => {
    ctx = ContextBuilder.build();
    game = new InstanceOfGame(getCurrentMinute(), 'game-ID', new Game(new ChutesAndLadders(5, 5)));
    turnStatus = TurnStatus.NOT_READY;
    output = { message: turnStatus };
    mockAddPlayersToGame(game);
    game.instance.playersArray.sort((a, b) => a.order - b.order);
    game.instance.instance.startSpace.land(game.instance.playersArray[0].avatar);
    ctx.put(GameContextKeys.ACTION, 'take-turn');
    ctx.put(GameContextKeys.GAME, game);
    ctx.put(GameContextKeys.REQUEST, mockReqObj);
    ctx.put(GameContextKeys.RESPONSE, mockRespObj);
  });

  describe('test take turn command in chain', () => {
    it('should fail because game is in NOT_READY state when receiving a turn ', () => {
      const commandResult = takeTurn.execute(ctx);

      expect(commandResult).toBeFalsy();
      expect(ctx.get(GameContextKeys.OUTPUT)).toEqual(output);
    });

    it('should fail because game is in GAME_WON state when receiving a turn', () => {
      const commandResult = takeTurn.execute(ctx);

      game.instance.readyToPlay = true;
      game.instance.haveWinner = true;
      turnStatus = TurnStatus.GAME_WON;

      expect(commandResult).toBeFalsy();
      expect(ctx.get(GameContextKeys.OUTPUT)).toEqual(output);
    });

    it('should pass to next command', () => {
      game.instance.readyToPlay = true;
      game.instance.haveWinner = false;

      const commandResult = takeTurn.execute(ctx);

      expect(commandResult).toBeTruthy();
      expect(game.lastActive).toEqual(getCurrentMinute());
      expect(ctx.getString(GameContextKeys.NEXT)).toEqual('verify-player');
    });

    it('should fail for incorrect ACTION on ctx obj', () => {
      ctx.put(GameContextKeys.ACTION, 'register');
      const commandResult = takeTurn.execute(ctx);

      expect(commandResult).toBeFalsy();
    });
  });

  describe('test verify player command in chain', () => {
    it('should pass to roll-dice', () => {
      ctx.put(GameContextKeys.NEXT, 'verify-player');
      game.instance.playerInTurn = game.instance.playersArray[1];

      const commandResult = verifyPlayer.execute(ctx);

      expect(commandResult).toBeTruthy();
      // expect(ctx.getString(GameContextKeys.NEXT)).toEqual('roll-dice');
      expect(ctx.get('player-taking-turn')).toEqual(game.instance.playerInTurn as Player);
    });

    it('should fail due to incorrect player taking turn', () => {
      ctx.put(GameContextKeys.NEXT, 'verify-player');

      game.instance.playerInTurn = game.instance.playersArray[0];
      output.message = TurnStatus.INVALID;
      const commandResult = verifyPlayer.execute(ctx);
      expect(commandResult).toBeFalsy();
      expect(ctx.get(GameContextKeys.OUTPUT)).toEqual(output);
    });

    it('should fail for incorrect next-handler', () => {
      ctx.put(GameContextKeys.NEXT, 'something-else');

      const commandResult = verifyPlayer.execute(ctx);

      expect(commandResult).toBeFalsy();
    });
  });

  describe('test roll dice command in chain', () => {
    it('should pass and add a moveDist prop to ctx obj. moveDist value is between 1 and number of sides of Die in Game', () => {
      ctx.put(GameContextKeys.NEXT, 'roll-dice');
      const commandResult = rollDice.execute(ctx);

      expect(commandResult).toBeTruthy();
      expect(ctx.get('moveDist')).toBeGreaterThanOrEqual(1);
      expect(ctx.get('moveDist')).toBeLessThanOrEqual(game.instance.instance.DIE.sides);
    });
    it('should fail', () => {
      ctx.put(GameContextKeys.NEXT, 'something-else');

      const commandResult = rollDice.execute(ctx);

      expect(commandResult).toBeFalsy();
    });
  });

  describe('test move avatar command in chain', () => {
    it('should pass with out prop of ctx obj being a valid turn status and update the location of player in turn avatar', () => {
      ctx.put(GameContextKeys.NEXT, 'move-avatar');
      output.message = TurnStatus.VALID;

      const playerTakingTurn = game.instance.playersArray[0] as Player;
      const moveDist = game.instance.instance.DIE.roll() as number;

      ctx.put('player-taking-turn', playerTakingTurn);
      ctx.put('moveDist', moveDist);

      const commandResult = moveAvatar.execute(ctx);

      expect(commandResult).toBeTruthy();
      expect((ctx.get('player-taking-turn') as Player).avatar.location.type).toEqual(SpaceType.NORMAL);
      expect(ctx.get(GameContextKeys.OUTPUT)).toEqual(output);
    });

    it('should fail', () => {
      ctx.put(GameContextKeys.NEXT, 'something-else');

      const commandResult = moveAvatar.execute(ctx);

      expect(commandResult).toBeFalsy();
    });
  });

  describe('test won game command in chain', () => {
    it('should pass and send ctx to next command in chain', () => {
      ctx.put(GameContextKeys.NEXT, 'won-game');

      const playerTakingTurn = game.instance.playersArray[0] as Player;
      playerTakingTurn.avatar.location = game.instance.instance.startSpace;

      ctx.put('player-taking-turn', playerTakingTurn);
      const commandResult = wonGame.execute(ctx);

      expect(commandResult).toBeTruthy();
      expect(ctx.getString(GameContextKeys.NEXT)).toEqual('rotate-player');
    });

    it('should fail and flip haveWinner flag in game instance to true', () => {
      ctx.put(GameContextKeys.NEXT, 'won-game');

      const playerTakingTurn = game.instance.playersArray[0] as Player;
      playerTakingTurn.avatar.location = game.instance.instance.startSpace;

      while (playerTakingTurn.avatar.location.next) {
        playerTakingTurn.avatar.location = playerTakingTurn.avatar.location.next;
      }

      ctx.put('player-taking-turn', playerTakingTurn);

      const commandResult = wonGame.execute(ctx);

      expect(commandResult).toBeFalsy();
      expect(game.instance.haveWinner).toBeTruthy();
    });
  });

  describe('test rotate player command in chain', () => {
    it('should pass and rotate player in turn within the active players array in game instance', () => {
      ctx.put(GameContextKeys.NEXT, 'rotate-player');

      const commandResult = rotatePlayer.execute(ctx);

      expect(commandResult).toBeTruthy();
      expect(game.instance.playerInTurn).toEqual(game.instance.playersArray[1]);
    });

    it('should fail', () => {
      ctx.put(GameContextKeys.NEXT, 'something-else');

      const commandResult = rotatePlayer.execute(ctx);

      expect(commandResult).toBeFalsy();
    });
  });
});
