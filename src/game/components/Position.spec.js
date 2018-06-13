import React from 'react';
import Position from './Position';
import { CROSS, NOUGHT } from '../players';
import Link from '../../router/Link';

describe('Position', () => {
  const positionWithOccupant = (occupant, link) => mount((
    <table>
      <tbody>
        <tr>
          <Position link={link} occupant={occupant} />
        </tr>
      </tbody>
    </table>
  ));

  const positionTextWithOccupant = (occupant, link) =>
    positionWithOccupant(occupant, link).text();

  it('renders the link', () => {
    const href = 'http://example.com/';
    const wrapper = positionWithOccupant(NOUGHT, href);
    const link = wrapper.find(Link);

    expect(link.prop('href')).toEqual(href);
  });

  describe('when occupied', () => {
    it('renders the occupying players symbol', () => {
      expect(positionTextWithOccupant(NOUGHT)).toEqual('\u2b58');
      expect(positionTextWithOccupant(CROSS)).toEqual('\u274C');
    });
  });

  describe('when not occupied', () => {
    it('renders no symbol', () => {
      expect(positionTextWithOccupant(undefined)).toEqual('\u00A0');
    });
  });
});
