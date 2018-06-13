import React from 'react';
import T from 'i18n-react';
import Score from './Score';
import gameFromString, { NEW_GAME } from '../gameFromString';

describe('Score', () => {
  const textForValue = value => mount((
    <div>
      <Score value={gameFromString(value)} />
    </div>
  )).text();

  describe('game is not finished', () => {
    it('renders the current players turn', () => {
      expect(textForValue(NEW_GAME)).toEqual(`\u274C${T.translate('game.turn')}`);
    });
  });

  describe('game is finished', () => {
    describe('draw', () => {
      it('renders a draw message', () => {
        expect(textForValue('oooxxxooxx')).toEqual(T.translate('game.draw'));
      });
    });

    describe('crosses win', () => {
      it('renders that crosses win', () => {
        expect(textForValue('ox__ox__ox')).toEqual(`\u274C${T.translate('game.won')}`);
      });
    });

    describe('noughts win', () => {
      it('renders that noughts win', () => {
        expect(textForValue('xo__xo_xxo')).toEqual(`\u2b58${T.translate('game.won')}`);
      });
    });
  });
});
