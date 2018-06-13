import React from 'react';
import Reset from './Reset';
import Link from '../../router/Link';
import { NEW_GAME } from '../gameFromString';

describe('Reset', () => {
  describe('hidden', () => {
    it('renders nothing', () => {
      const reset = shallow(<Reset hidden />);

      expect(reset.exists()).toBeTruthy();
    });
  });

  describe('shown', () => {
    it('renders a link to a new game', () => {
      const reset = mount(<Reset />);
      const link = reset.find(Link);

      expect(link).toBeDefined();
      expect(link.prop('href')).toEqual(`/${NEW_GAME}`);
    });
  });
});
