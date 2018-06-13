import range from './range';

describe('range', () => {
  const from = 4;
  const to = 8;

  describe('next', () => {
    it('is called from a bound to another bound', () => {
      let count = 0;
      const hundred = range(from, to);
      while (hundred.hasNext()) {
        hundred.next();
        count += 1;
      }
      expect(count).toEqual(to - from);
    });

    it('throws an error if range is complete', () => {
      const hundred = range(0, 1);
      expect(() => hundred.next()).not.toThrowError();
      expect(() => hundred.next()).toThrowError();
    });
  });

  describe('forEach', () => {
    it('is monotonic', () => {
      let last = null;
      range(from, to).forEach((n) => {
        if (last === null) {
          expect(n).toEqual(from);
        } else {
          expect(n).toEqual(last + 1);
        }
        last = n;
      });
      expect(last).toEqual(to - 1);
    });
  });

  describe('map', () => {
    it('transforms each of the ranges values', () => {
      expect(range(from, to).map(n => `a${n}`)).toEqual(['a4', 'a5', 'a6', 'a7']);
    });
  });
});
