import React from 'react';
import Board from './Board';
import Position from './Position';
import gameFromString from '../gameFromString';
import { CROSS, NOUGHT } from '../players';

describe('Board', () => {
  const game = gameFromString('xox_______');

  const gamePositions = () => mount(<Board value={game} />).find(Position);

  const propForPosition = (index, prop) => gamePositions().at(index).prop(prop);

  it('renders a three by three board', () => {
    expect(gamePositions()).toHaveLength(3 * 3);
  });

  it('passes nought to positions occupied by noughts', () => {
    expect(propForPosition(0, 'occupant')).toEqual(NOUGHT);
  });

  it('passes cross to positions occupied by crosses', () => {
    expect(propForPosition(1, 'occupant')).toEqual(CROSS);
  });

  it('passes link to the next move for the current player', () => {
    expect(propForPosition(2, 'link')).toEqual(game.move(CROSS, 0, 2).toString());
  });
});
