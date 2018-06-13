import React from 'react';
import Router from './Router';

describe('Router', () => {
  const TestComponent1 = () => <div />;
  const TestComponent2 = () => <div />;

  it('pushes the window location path into child components', () => {
    visit('https://127.0.0.1/something');

    const wrapper = mount((
      <Router>
        <TestComponent1 />
        <TestComponent2 />
      </Router>
    ));

    expect(wrapper.find(TestComponent1).prop('value')).toEqual('something');
    expect(wrapper.find(TestComponent2).prop('value')).toEqual('something');

    visit('https://127.0.0.1/something-else');

    expect(wrapper.find(TestComponent1).prop('value')).toEqual('something');
    expect(wrapper.find(TestComponent2).prop('value')).toEqual('something');

    const router = wrapper.find(Router).instance();
    router.onLocationChange();
    wrapper.update();

    expect(wrapper.find(TestComponent1).prop('value')).toEqual('something-else');
    expect(wrapper.find(TestComponent2).prop('value')).toEqual('something-else');
  });

  it('binds to window onpopstate onpushstate', () => {
    expect(window.onpopstate).toBeNull();
    expect(window.onpushstate).toBeNull();

    const wrapper = mount((
      <Router>
        <TestComponent1 />
        <TestComponent2 />
      </Router>
    ));

    expect(window.onpopstate).not.toBeNull();
    expect(window.onpushstate).not.toBeNull();

    const router = wrapper.find(Router);
    const instance = router.instance();

    const onLocationChange = jest.spyOn(instance, 'onLocationChange');

    expect(onLocationChange).not.toHaveBeenCalled();

    visit('https://127.0.0.1/something');

    const preventDefault = jest.fn();

    window.onpushstate({});

    expect(preventDefault).toHaveBeenCalledTimes(0);
    expect(onLocationChange).toHaveBeenCalledTimes(1);

    window.onpopstate({ preventDefault });

    expect(preventDefault).toHaveBeenCalledTimes(1);
    expect(onLocationChange).toHaveBeenCalledTimes(2);

    wrapper.unmount();

    expect(window.onpopstate).toBeNull();
    expect(window.onpushstate).toBeNull();
  });
});
