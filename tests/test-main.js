var tests = [];
for (var file in window.__karma__.files) {
  if (window.__karma__.files.hasOwnProperty(file)) {
    if (/spec.js$/.test(file)) {
      tests.push(file);
    }
  }
}

console.log("Test files: ", tests);

requirejs.config({
    // Karma serves files from '/base'
    baseUrl: '/base/src',

    // ask Require.js to load these files (all our tests)
    deps: tests,

    // start test run, once Require.js is done
    callback: window.__karma__.start
});
