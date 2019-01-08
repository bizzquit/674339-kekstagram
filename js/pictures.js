'use strict';
(function () {

  var showPopUpSuccess = function () {
    var loadPhotoTemplate = successLoadPhotoTemplate.cloneNode(true);
    addFragmentToParent(mainContainer, loadPhotoTemplate);
    var buttonSuccess = mainContainer.querySelector('.success__button');
    var containerSuccessLoad = mainContainer.querySelector('.success');
    closesPopUpWindow(buttonSuccess, containerSuccessLoad, loadPhotoTemplate);
  };

  var showPopUpError = function () {
    var loadPhotoTemplate = errorLoadPhotoTemplate.cloneNode(true);
    addFragmentToParent(mainContainer, loadPhotoTemplate);
    var buttonError = mainContainer.querySelectorAll('.error__button');
    var containerErrorLoad = mainContainer.querySelector('.error');
    closesPopUpWindow(buttonError, containerErrorLoad, loadPhotoTemplate);
  };

  var closesPopUpWindow = function (button, container, template) {
    var keyPress = function (event) {
      if (event.keyCode === window.upload.keyCode.ESC) {
        mainContainer.removeChild(container);
        document.removeEventListener('keydown', keyPress);
      }
    };
    document.addEventListener('keydown', keyPress);
    container.addEventListener('click', function (evt) {
      if (evt.target.attributes.class.value === 'error' || evt.target.attributes.class.value === 'success') {
        mainContainer.removeChild(template);
      } else if (evt.target.attributes.class.value === 'error__button' || evt.target.attributes.class.value === 'success__button') {
        mainContainer.removeChild(template);
      }
    });
  };

  var deletingPhotos = function () {
    var allPhotos = parentBlog.querySelectorAll('.picture');
    for (var i = 0; i < allPhotos.length; i++) {
      parentBlog.removeChild(allPhotos[i]);
    }
    console.log('Удалил  ' + pictures.length + '  Элементов');
    /*createdPhotos(pictures);*/
  };

  var createdPhotos = function (pictures) {
    console.log(pictures);
    for (var i = 0; i < pictures.length; i++) {
      addDataToTemplate(i);
    }
    addFragmentToParent(parentBlog, fragment);

    parentBlog.querySelectorAll('.picture').forEach(function (element, numArr) {
      element.addEventListener('click', function () {
        bigPicturesBlock.classList.remove('hidden');
        bigPicturesBlock.querySelector('.big-picture__img img')
          .setAttribute('src', pictures[numArr].url);
        bigPicturesBlock.querySelector('.likes-count')
          .textContent = pictures[numArr].likes;
        bigPicturesBlock.querySelector('.social__caption')
          .textContent = pictures[numArr].description;
        bigPicturesBlock.querySelector('.comments-count')
          .textContent = pictures[numArr]
          .comments.length;

        for (var y = 0; y < pictures[numArr].comments.length; y++) {
          showBigPhotoWithComments(y, numArr);
          document.body.classList.add('modal-open');
        }
        addFragmentToParent(socialCommentsBlocks, fragmentForComments);
      });
    });
  };

  var sortingList = function () {
    var picturesCopy = pictures.slice();
    pictures.sort(function (first, second) {
      if (first.comments.length > second.comments.length) {
        return -1;
      } else if (first.comments.length < second.comments.length) {
        return 1;
      } else {
        return 0;
      }
    });
    createdPhotos(pictures);
  };

  window.pictures = {
    showPopUpSuccess: showPopUpSuccess,
    showPopUpError: showPopUpError,
    deletingPhotos: deletingPhotos,
    sortingList: sortingList
  };

  /**
   * Функция обратного вызова - получаем на вход в виде параметра = массив из JSON,
   * дальше обрабатываем и получаем данные для отображения
   * @function
   * @param {Array} arrayJson = массив
   */
  function successHandler(arrayJson) {
    for (var i = 0; i < arrayJson.length; i++) {
      pictures.push({
        url: arrayJson[i].url,
        likes: arrayJson[i].likes,
        comments: arrayJson[i].comments,
        description: arrayJson[i].description
      });
    }
    createdPhotos(arrayJson);
  }

  var errorHandler = function (errorJson) {
    var blockError = document.createElement('div');
    blockError.style =
        'position:absolute;' +
        'width:340px;' +
        'z-index: 10;' +
        'text-align: center; ' +
        'font-size:24px;' +
        'line-height: 32px;' +
        'border: 2px solid red;' +
        'padding: 10px;';
    blockError.textContent = errorJson;
    document.body.insertAdjacentElement('afterbegin', blockError);
  };

  /**
   * Функция заполняет данные увеличеной фотографиию.
   * @function
   * @param {number} numComments элеммент массива pictures[].
   * @param {number} number Номер элемента в массиве
   */
  function showBigPhotoWithComments(numComments, number) {
    imageSrcAvatar.setAttribute('src', pictures[number].comments[numComments].avatar);
    socialText.textContent = pictures[number].comments[numComments].message;
    var socialTemplate = similarCommentTemplate.cloneNode(true);
    addFragmentToParent(fragmentForComments, socialTemplate);
  }

  /**
   * функция вставляет в родителя шаблон с заполнеными данными элемента массива
   * @function
   * @param {number} arrElement элемент массива pictures[].
   */
  function addDataToTemplate(arrElement) {
    imageSrc.setAttribute('src', pictures[arrElement].url);
    commentText.textContent = pictures[arrElement].comments.length;
    sumLikes.textContent = pictures[arrElement].likes;
    var pictureTemplate = similarPictureTemplate.cloneNode(true);
    addFragmentToParent(fragment, pictureTemplate);
  }

  /**
   * Функция вставляет готовый фрагмент шаблона в нужное место.
   * @function
   * @param {string} parent элемент родителя.
   * @param {string} element фрагмент.
   */
  function addFragmentToParent(parent, element) {
    parent.appendChild(element);
  }

  var mainContainer = document.getElementsByTagName('main')[0];
  var successLoadPhotoTemplate = document.querySelector('#success')
      .content
      .querySelector('.success');
  var errorLoadPhotoTemplate = document.querySelector('#error')
      .content
      .querySelector('.error');

  var pictures = [];
  var parentBlog = document.querySelector('.pictures');
  var similarPictureTemplate = document.querySelector('#picture')
    .content
    .querySelector('.picture');

  var imageSrc = similarPictureTemplate.querySelector('.picture__img');
  var commentText = similarPictureTemplate.querySelector('.picture__comments');
  var sumLikes = similarPictureTemplate.querySelector('.picture__likes');
  var fragment = document.createDocumentFragment();
  var fragmentForComments = document.createDocumentFragment();
  var bigPicturesBlock = document.querySelector('.big-picture');
  var socialCommentsBlocks = bigPicturesBlock.querySelector('.social__comments');
  socialCommentsBlocks.innerHTML = '';
  var similarCommentTemplate = document.querySelector('#social__comments')
    .content
    .querySelector('.social__comment');
  var imageSrcAvatar = similarCommentTemplate.querySelector('.social__picture');
  var socialText = similarCommentTemplate.querySelector('.social__text');

  document.querySelector('.social__comment-count').classList.add('visually-hidden');
  document.querySelector('.comments-loader').classList.add('visually-hidden');
  document.querySelector('.big-picture__cancel').addEventListener('click', function () {
    bigPicturesBlock.classList.add('hidden');
    document.body.classList.remove('modal-open');
  });
  window.backend.loading(successHandler, errorHandler);
})();
