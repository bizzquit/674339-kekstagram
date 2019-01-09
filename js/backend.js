'use strict';

(function () {
  var URL_LOAD = 'https://js.dump.academy/kekstagram/data';
  var URL_SEND = 'https://js.dump.academy/kekstagram';
  var form = document.querySelector('#upload-select-image');
  var filtersContainer = document.querySelector('.img-filters');

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
    },
    form: form,
    filtersContainer: filtersContainer
  };

  var createsRequestJson = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onLoad(xhr.response);
        filtersContainer.classList.remove('img-filters--inactive');
      } else {
        onError('Что-то пошло не так :(  Код ошибки = ' + xhr.status + ' : ' + xhr.statusText);
      }
    });
    return xhr;

  };

  form.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.backend.sending(new FormData(form), function () {
      form.reset();
      window.upload.closesWindowNewPhoto();
      document.querySelector('.img-upload__label').style.display = 'none';
      window.pictures.showPopUpSuccess();
    },
    function () {
      form.reset();
      window.upload.closesWindowNewPhoto();
      window.pictures.showPopUpError();
    });
  });

})();
