/* istanbul ignore next */
if (typeof window === 'undefined') {
  global.window = { history: {} };
}

const { pushState } = window.history;

window.history.pushState = function pushStateWithCallback(...args) {
  // eslint-disable-next-line prefer-rest-params
  pushState.apply(this, arguments);
  if (typeof window.onpushstate === 'function') {
    window.onpushstate(...args);
  }
};
