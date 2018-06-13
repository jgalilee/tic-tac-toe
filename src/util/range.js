class Range {
  constructor(from, to, step = 1) {
    this.current = from;
    this.to = to;
    this.step = step;
  }

  hasNext() {
    return this.current < this.to;
  }

  next() {
    if (this.hasNext()) {
      const result = this.current;
      this.current += this.step;
      return result;
    }
    throw new Error('range out of bounds');
  }

  forEach(callback) {
    while (this.hasNext()) {
      callback(this.next());
    }
  }

  map(callback) {
    const result = [];
    this.forEach(n => result.push(callback(n)));
    return result;
  }
}

export default (from, to) => new Range(from, to);
