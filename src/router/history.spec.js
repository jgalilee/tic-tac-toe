import './history';

describe('history', () => {
  describe('onpushstate', () => {
    it('is called after pushstate is called', () => {
      const callback = jest.fn();

      window.onpushstate = callback;
      window.history.pushState({}, '', '/example');

      expect(callback.mock.calls).toHaveLength(1);
    });

    it('ignores values not of type function', () => {
      window.onpushstate = 'x';
      window.history.pushState({}, '', '/example');
    });
  });
});
