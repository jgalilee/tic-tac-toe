import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

const mounted = [];

['mount', 'shallow'].forEach((property) => {
  global[property] = (...args) => {
    const wrapper = Enzyme[property](...args);
    mounted.push(wrapper);
    return wrapper;
  };
});

// eslint-disable-next-line no-undef
global.visit = url => jsdom.reconfigure({ url });

beforeEach(() => visit('https://127.0.0.1/'));

afterEach(() => {
  while (mounted.length > 0) {
    mounted.pop().unmount();
  }
  jest.clearAllMocks();
});
