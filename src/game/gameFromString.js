import { CROSS, NOUGHT } from './players';

export const NEW_GAME = 'x_________';

export const validateGame = (value) => {
  if (value.length !== 10) {
    throw new Error(`invalid game; expected length 10, got: ${value.length} (${value})`);
  }
  for (let i = 0, j = value.length; i < j; i += 1) {
    if (!['x', 'o', '_'].includes(value.charAt(i))) {
      throw new Error(`invalid game; unknown character at position: ${i}`);
    }
  }
  return value;
};

class Game {
  constructor(value) {
    this.value = validateGame(value);
  }

  static asSymbol(value) {
    switch (value) {
      case 'x':
        return CROSS;
      case 'o':
        return NOUGHT;
      default:
        return undefined;
    }
  }

  at(row, col) {
    const value = this.value.substring(1).charAt((row * 3) + col);
    if (value === '_') {
      return undefined;
    }
    return value;
  }

  playerAt(row, col) {
    return Game.asSymbol(this.at(row, col));
  }

  player() {
    return Game.asSymbol(this.value.charAt(0));
  }

  valid(player, row, col) {
    if (player !== this.player()) {
      return false;
    }
    if (this.finished()) {
      return false;
    }
    return this.at(row, col) === undefined;
  }

  move(player, row, col) {
    if (this.valid(player, row, col)) {
      const currentPlayer = (player === CROSS ? 'x' : 'o');
      const nextPlayer = (player === CROSS ? 'o' : 'x');
      const index = (row * 3) + col;
      let game = this.value.substring(1);
      game = game.substring(0, index) + currentPlayer + game.substring(index + 1);
      return new Game(nextPlayer + game);
    }
    return this;
  }

  winner() {
    const lines = [
      this.at(0, 0) + this.at(1, 1) + this.at(2, 2),
      this.at(0, 2) + this.at(1, 1) + this.at(2, 0),
      this.at(0, 0) + this.at(0, 1) + this.at(0, 2),
      this.at(1, 0) + this.at(1, 1) + this.at(1, 2),
      this.at(2, 0) + this.at(2, 1) + this.at(2, 2),
      this.at(0, 0) + this.at(1, 0) + this.at(2, 0),
      this.at(0, 1) + this.at(1, 1) + this.at(2, 1),
      this.at(0, 2) + this.at(1, 2) + this.at(2, 2),
    ];
    for (let i = 0, j = lines.length; i < j; i += 1) {
      switch (lines[i]) {
        case 'xxx':
          return CROSS;
        case 'ooo':
          return NOUGHT;
      }
    }
    return undefined;
  }

  finished() {
    return this.winner() !== undefined || this.value.indexOf('_') === -1;
  }

  toString() {
    return this.value;
  }
}

export default val => new Game(val);
