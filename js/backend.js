'use strict';
(function () {
  var URL_LOAD = 'https://js.dump.academy/kekstagram/data';
  var URL_SEND = 'https://js.dump.academy/kekstagram';

  window.backend = {
    loading: function (onLoad, onError) {
      var loadDataJson = createsRequestJson(onLoad, onError);
      loadDataJson.open('GET', URL_LOAD);
      loadDataJson.send();
    },
    sending: function (data, onLoad, onError) {
      var sendDataForm = createsRequestJson(onLoad, onError);
      sendDataForm.open('POST', URL_SEND);
      sendDataForm.send(data);
    }
  };

  var createsRequestJson = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onLoad(xhr.response);
      } else {
        onError('Что-то пошло не так :(  Код ошибки = ' + xhr.status + ' : ' + xhr.statusText);
      }
    });
    xhr.addEventListener('timeout', function () {
      onError('Б-е-е-е-е-да!!! Запрос не выполнился за ' + xhr.timeout / 1000 + ' секунд');
    });
    xhr.timeout = 5000;
    return xhr;
  };

})();
