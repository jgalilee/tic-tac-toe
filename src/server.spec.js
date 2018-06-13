import request from 'supertest';
import app from './server';
import { NEW_GAME } from './game/gameFromString';

describe('server', () => {
  beforeEach(() => {
    jest.spyOn(console, 'log').mockImplementation();
    jest.spyOn(console, 'error').mockImplementation();
  });

  ['/', '/an/unknown/path'].forEach(path => describe(path, () => {
    it('redirects to a new game', async () => {
      await request(app).get(path).then((response) => {
        expect(response.status).toEqual(302);
        expect(response.headers.location).toEqual(`/${NEW_GAME}`);
      });
    });
  }));

  describe('invalid game', () => {
    it('redirects to a new game with the error', async () => {
      const badGame = 'x______';
      const badGameError = encodeURIComponent('invalid game; expected length 10, got: 7 (x______)');
      await request(app).get(`/${badGame}`).then((response) => {
        expect(response.status).toEqual(302);
        expect(response.headers.location).toEqual(`/${NEW_GAME}?error=${badGameError}`);
      });
    });
  });

  describe('valid game', () => {
    it('renders the game', async () => {
      await request(app).get('/x____xo___').then((response) => {
        expect(response.status).toEqual(200);
        expect(response.text).toContain('<main data-reactroot');
      });
    });
  });
});
