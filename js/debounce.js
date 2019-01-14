'use strict';
(function () {
  var TIMEOUT_INTERVAL = 500;

  window.debounce = function (func) {
    var timeout;
    return function () {
      var parameters = arguments;
      if (timeout) {
        clearTimeout(timeout);
      }
      timeout = setTimeout(function () {
        func.apply(null, parameters);
      }, TIMEOUT_INTERVAL);
    };
  };

})();
