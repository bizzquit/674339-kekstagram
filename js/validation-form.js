'use strict';
(function () {
  var MAX_HASHTAGS = 5; // максимальное кол-во хэштегов
  var MAX_LENGTH_HASHTAG = 25; // Максимальная длина хэштега

  var validations = function (arr) {
    arr.forEach(function (elem) {
      var lengthHash = elem.length;
      var firstSymbol = elem[0];
      var errorInputHash = '';
      if (elem.indexOf('#', 2) !== -1) {
        errorInputHash = 'Хэштеги должны разделяться пробелом';
      } else if (firstSymbol !== '#') {
        errorInputHash = 'Хэштег должен начинается со знака "#"';
      } else if (lengthHash === 1) {
        errorInputHash = 'Хэштег должен быть больше 1 знака';
      } else if (arr.length > 1) {
        for (var i = 0; i < arr.length; i++) {
          var hashtag = arr[i];
          var hashtagPrevious = arr.slice(0, i);
          if (hashtagPrevious.indexOf(hashtag) > -1) {
            errorInputHash = '2-а одинаковых хэштега - НЕЛЬЗЯ';
          }
        }
      } else if (lengthHash > MAX_LENGTH_HASHTAG) {
        errorInputHash = 'Введено больше 25 символов для 1-го Хэштэга';
      } else if (arr.length > MAX_HASHTAGS) {
        errorInputHash = 'Введено больше 5 ХЭШТЭГОВ';
      }
      window.upload.inputHashTags.setCustomValidity(errorInputHash);
    });
  };

  window.upload.inputHashTags.addEventListener('input', function (evt) {
    var elementsHashTags = evt.target.value.trim().toLowerCase().split(' ');
    validations(elementsHashTags);
  });

  window.upload.textDescription.addEventListener('change', function (evt) {
    var lengthDescription = evt.target.value.length;
    if (lengthDescription > 0 && lengthDescription < 2) {
      window.upload.textDescription.setCustomValidity('Комментарий не может быть меньше 2-х символов');
    } else if (lengthDescription > 140) {
      window.upload.textDescription.setCustomValidity('Комментарий не может быть больше 140 символов - сейчас у ВАС ' + lengthDescription + ' символ(а)(ов)');
    } else {
      window.upload.textDescription.setCustomValidity('');
    }
  });

})();
