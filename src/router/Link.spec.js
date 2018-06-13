import React from 'react';
import Link from './Link';
import * as modulePush from './push';

describe('Link', () => {
  it('calls push with the given href', () => {
    const push = jest.spyOn(modulePush, 'default');
    const wrapper = mount(<Link href="/path" />);

    wrapper.simulate('click', {});

    expect(push).toHaveBeenCalledWith('/path');
  });
});
