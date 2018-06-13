import push from './push';

describe('push', () => {
  it('adds the location to the window history', () => {
    const pushState = jest.spyOn(window.history, 'pushState');
    const preventDefault = jest.fn();

    push('/something')({ preventDefault });

    expect(preventDefault).toHaveBeenCalled();
    expect(pushState).toHaveBeenCalledWith({}, undefined, '/something');
  });
});
