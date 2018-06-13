import React from 'react';
import Player from './Player';
import { CROSS, NOUGHT } from '../players';

describe('Player', () => {
  const mountValue = value => mount(<Player value={value} />);
  const textForValue = value => mountValue(value).text();
  const classForValue = value => mountValue(value).find('span').prop('className');

  describe('occupant', () => {
    it('renders a blank space for undefined', () => {
      expect(classForValue()).toBeUndefined();
      expect(textForValue()).toEqual('\u00A0');
    });

    it('renders a blank space for unknown', () => {
      expect(classForValue('unknown')).toBeUndefined();
      expect(textForValue('unknown')).toEqual('\u00A0');
    });

    it('renders a cross for cross', () => {
      expect(classForValue(CROSS)).toEqual('cross');
      expect(textForValue(CROSS)).toEqual('\u274C');
    });

    it('renders a nought for nought', () => {
      expect(classForValue(NOUGHT)).toEqual('nought');
      expect(textForValue(NOUGHT)).toEqual('\u2b58');
    });
  });
});
