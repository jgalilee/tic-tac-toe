import gameFromString from './gameFromString';
import { CROSS, NOUGHT } from './players';

describe('gameFromString', () => {
  it('throws an error if the string is too short', () => {
    expect(() => gameFromString('xox')).toThrowError();
  });

  it('throws an error if the string is too long', () => {
    expect(() => gameFromString('xox________')).toThrowError();
  });

  it('throws an error if the string contains a character other than x, o, or _', () => {
    expect(() => gameFromString('xox___!!__')).toThrowError();
  });

  describe('at', () => {
    it('returns the value of the position in the string', () => {
      const game = gameFromString('ox_xoxo_x_');

      expect(game.at(0, 0)).toEqual('x');
      expect(game.at(0, 1)).toBeUndefined();
      expect(game.at(0, 2)).toEqual('x');
      expect(game.at(1, 0)).toEqual('o');
      expect(game.at(1, 1)).toEqual('x');
      expect(game.at(1, 2)).toEqual('o');
      expect(game.at(2, 0)).toBeUndefined();
      expect(game.at(2, 1)).toEqual('x');
      expect(game.at(2, 2)).toBeUndefined();
    });
  });

  describe('playerAt', () => {
    const game = gameFromString('xox_______');

    it('converts o to NOUGHT', () => expect(game.playerAt(0, 0)).toEqual(NOUGHT));

    it('converts x to CROSS', () => expect(game.playerAt(0, 1)).toEqual(CROSS));

    it('converts _ to undefined', () => expect(game.playerAt(0, 2)).toBeUndefined());
  });

  describe('player', () => {
    it('returns CROSS if the game starts with a cross', () => {
      expect(gameFromString('xxxxoxooxo').player()).toEqual(CROSS);
    });

    it('returns NOUGHT if the game starts with a cross', () => {
      expect(gameFromString('oxxxoxooxo').player()).toEqual(NOUGHT);
    });
  });

  describe('valid', () => {
    describe('game is finished', () => {
      it('returns false if the position is taken', () => {
        expect(gameFromString('oxxx______').valid(NOUGHT, 0, 1)).toEqual(false);
      });

      it('returns false if the position is empty', () => {
        expect(gameFromString('oxxx______').valid(NOUGHT, 1, 1)).toEqual(false);
      });
    });

    describe('game is not finished', () => {
      it('returns false if the position is taken', () => {
        expect(gameFromString('oxox______').valid(NOUGHT, 0, 1)).toEqual(false);
      });

      it('returns false if the position is empty and it is not the players turn', () => {
        expect(gameFromString('oxox______').valid(CROSS, 1, 1)).toEqual(false);
      });

      it('returns true if the position is empty and it is the players turn', () => {
        expect(gameFromString('oxox______').valid(NOUGHT, 1, 1)).toEqual(true);
      });
    });
  });

  describe('move', () => {
    const game = gameFromString('ox________');

    it('returns the same game if the move was invalid', () => {
      expect(game.move(NOUGHT, 0, 0).toString()).toEqual('ox________');
    });

    it('returns the next game if the move was valid', () => {
      expect(game.move(NOUGHT, 0, 1).toString()).toEqual('xxo_______');
    });
  });

  describe('winner', () => {
    it('returns crosses if crosses won', () => {
      expect(gameFromString('xxxxoo____').winner()).toEqual(CROSS);
    });

    it('returns noughts if noughts won', () => {
      expect(gameFromString('ooooxx_x__').winner()).toEqual(NOUGHT);
    });
  });

  describe('finished', () => {
    it('returns false if there is not a winner', () => {
      expect(gameFromString('oxox______').finished()).toEqual(false);
    });

    it('returns true if there is a draw', () => {
      expect(gameFromString('ooxxxooxox').finished()).toEqual(true);
    });

    it('returns true if there is a winner', () => {
      expect(gameFromString('oxxx______').finished()).toEqual(true);
    });
  });

  describe('toString', () => {
    const gameString = 'oxox______';

    it('returns the game as a string', () => expect(gameFromString(gameString).toString()).toEqual(gameString));
  });
});
