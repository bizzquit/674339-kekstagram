'use strict';
(function () {
  var textDescription = document.querySelector('.text__description');
  var inputHashTags = document.querySelector('.text__hashtags');

  window.upload = {
    textDescription: textDescription,
    inputHashTags: inputHashTags
  };

  /**
   * функция "псевдо" добавления нового фото срабатывает при 'change' #upload-file
   * в конце удаляет обработчик
   * @function
   */
  function addedNewPhoto() {
    document.querySelector('.img-upload__overlay').classList.remove('hidden');
    uploadFile.removeEventListener('change', addedNewPhoto);
  }

  /**
   * Функция закрытия окна добавление нового фото.
   * @function
   */
  function closesWindowNewPhoto() {
    document.querySelector('.img-upload__overlay').classList.add('hidden');
    uploadFile.removeEventListener('change', closesWindowNewPhoto);
    uploadFile.removeEventListener('change', addedNewPhoto);
  }

  var uploadFile = document.querySelector('#upload-file');
  var imageUpWindowClose = document.querySelector('.img-upload__cancel');

  uploadFile.addEventListener('change', addedNewPhoto);
  imageUpWindowClose.addEventListener('click', closesWindowNewPhoto);

  document.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.KeyCode.ESC && document.activeElement !== textDescription && document.activeElement !== inputHashTags) {
      closesWindowNewPhoto();
    }
  });


})();
