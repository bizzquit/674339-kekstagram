'use strict';
(function () {
  var textDescription = document.querySelector('.text__description');
  var inputHashTags = document.querySelector('.text__hashtags');

  /**
   * Функция закрытия окна добавление нового фото.
   * @function
   */
  var closesWindowNewPhoto = function () {
    window.backend.form.reset();
    document.querySelector('.img-upload__overlay').classList.add('hidden');
    uploadFile.removeEventListener('change', closesWindowNewPhoto);
  };

  window.upload = {
    textDescription: textDescription,
    inputHashTags: inputHashTags,
    closesWindowNewPhoto: closesWindowNewPhoto,
    keyCode: {
      ESC: 27,
      ENTER: 13,
      SPACE: 32
    }
  };

  /**
   * функция добавления нового фото срабатывает при 'change' #upload-file
   * в конце удаляет обработчик
   * @function
   */
  function addedNewPhoto() {
    document.querySelector('.img-upload__overlay').classList.remove('hidden');
    window.effectPhoto.effectLevelPin.style.left = '100%';
    window.effectPhoto.effectLevelDepth.style.width = '100%';
  }

  var uploadFile = document.querySelector('#upload-file');
  var imageUpWindowClose = document.querySelector('.img-upload__cancel');

  uploadFile.addEventListener('change', addedNewPhoto);
  imageUpWindowClose.addEventListener('click', closesWindowNewPhoto);

  document.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.upload.keyCode.ESC && document.activeElement !== textDescription && document.activeElement !== inputHashTags) {
      closesWindowNewPhoto();
    }
  });

})();
