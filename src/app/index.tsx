(async () => {
  try {
    import(/* webpackMode: "eager" */ './client');
  } catch {
    // do nothing
  }
})();
