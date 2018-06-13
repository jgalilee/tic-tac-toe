import React from 'react';
import Game from './Game';
import Board from './Board';
import Score from './Score';
import { NEW_GAME } from '../gameFromString';
import Reset from './Reset';

describe('Game', () => {
  describe('reset', () => {
    describe('game is finished', () => {
      it('sets reset hidden to false', () => {
        const reset = mount(<Game value="xxoxxoxxox" />).find(Reset);

        expect(reset.prop('hidden')).toBeFalsy();
      });
    });

    describe('game not is finished', () => {
      it('sets reset hidden to true', () => {
        const reset = mount(<Game value={NEW_GAME} />).find(Reset);

        expect(reset.prop('hidden')).toBeTruthy();
      });
    });
  });

  it('renders the board', () => {
    const board = mount(<Game />).find(Board);

    expect(board).toHaveLength(1);
    expect(board.prop('value')).toEqual({ value: NEW_GAME });
  });

  it('renders the score', () => {
    const score = mount(<Game />).find(Score);

    expect(score).toHaveLength(1);
    expect(score.prop('value')).toEqual({ value: NEW_GAME });
  });
});
