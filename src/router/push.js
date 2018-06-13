export default link => (event) => {
  event.preventDefault();
  window.history.pushState({}, undefined, link);
};
