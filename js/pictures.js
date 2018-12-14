'use strict';
(function () {
  window.KeyCode = {
    ESC: 27,
    ENTER: 13,
    SPACE: 32
  };

  var MIN_PICTURE_LIKE = 15; // минимальное кол-во лайков
  var MAX_PICTURE_LIKE = 200; // максимальное кол-во лайков
  var SUM_PICTURES = 25; // Кол-во фотографий других пользователей
  var MAX_COMMENT = 7; // Максимальное кол-во комментов
  var ZOOM = 25; // Шаг зумирования
  var MIN_ZOOM = 25; // минимальное значение зума
  var MAX_ZOOM = 100; // максимальное значение зума
  var MAX_HASHTAGS = 5;
  var MAX_LENGTH_HASHTAG = 25;

  /**
   * Функция создания рандомного числа от мин (или 0 если нет) до макс
   * @param {number} max -Максимальное число.
   * @param {number} min - Минимальное число
   * @return {number}  Случайное число от мин-макс
   */
  function createsRandomNumber(max, min) {
    min = min || 0;
    return Math.floor(Math.random() * (max - min) + min);
  }

  /**
   * функция для генерации массива случайных комментариев
   * @function
   */
  function createsRandomComments() {
    for (var n = 0; n < createsRandomNumber(MAX_COMMENT, 1); n++) {
      commentsArr.push({
        comment: comments[createsRandomNumber(comments.length)]
      });
    }
  }

  /**
   * функция создает объект с рандомным числом лайков, массивом комментариев и случайным описанием.
   * @function
   * @param {number} numberPhoto порядковый номер элемента.
   */
  function createsPhoto(numberPhoto) {
    pictures.push({
      url: 'photos/' + numberPhoto + '.jpg',
      likes: createsRandomNumber(MAX_PICTURE_LIKE, MIN_PICTURE_LIKE),
      comments: commentsArr,
      description: descriptions[createsRandomNumber(descriptions.length)]
    });
  }

  /**
   * Функция заполняет данные увеличеной фотографиию.
   * @function
   * @param {number} numComments элеммент массива pictures[].
   * @param {number} number Номер элемента в массиве
   */
  function showBigPhotoWithComments(numComments, number) {
    imageSrcAvatar.setAttribute('src', 'img/avatar-' + createsRandomNumber(7, 1) + '.svg');
    socialText.textContent = pictures[number].comments[numComments].comment;
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

  /**
   * Функция управления InZoom, OutZoom с параметрами ограничения.
   * @param {number} maxZoom Максимум (100%).
   * @param {number} minZoom Минимум (25%).
   */
  function zoomInOutPhoto(maxZoom, minZoom) {
    if (valueControl > maxZoom) {
      valueControl = maxZoom;
    }
    if (valueControl < minZoom) {
      valueControl = minZoom;
    }
    imageZoom.style.transform = 'scale(' + valueControl / 100 + ')';
    photoZoomControl.value = valueControl + '%';
  }

  /**
   * Функция смены эффекта наложения на фото, 1) чистим имеющийся класс, втыкаем новый.
   * @function
   */
  function changeEffect() {
    var effectListPhoto = document.querySelector('input[name="effect"]:checked')
      .attributes.value.value;
    imagePreview.removeAttribute('class');
    imagePreview.classList.add('effects__preview--' + effectListPhoto);
    imagePreview.style.filter = '';
  }

  /**
   * Функция изменения интенсивности наложения эффекта на фото (Scrolling)
   * @function
   */
  function changeEffectScroll() {
    var effectListPhoto = document.querySelector('input[name="effect"]:checked')
      .attributes.value.value;
    var result = (effectLevelPin.offsetLeft / effectLevelLine.offsetWidth).toFixed(2);
    var effectsOnPhoto = {
      'none': 'filter: none',
      'chrome': 'filter: grayscale(' + 1 * result + ')',
      'sepia': 'filter: sepia(' + 1 * result + ')',
      'marvin': 'filter: invert(' + 100 * result + '%)',
      'phobos': 'filter: blur(' + 3 * result + 'px)',
      'heat': 'filter: brightness(' + 3 * result + ')'
    };
    imagePreview.style = effectsOnPhoto[effectListPhoto];
  }

  var comments = [
    'Всё отлично!',
    'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
  ];

  var descriptions = [
    'Тестим новую камеру!',
    'Затусили с друзьями на море',
    'Как же круто тут кормят',
    'Отдыхаем...',
    'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......',
    'Вот это тачка!'
  ];

  var commentsArr;
  var pictures = [];

  var parentBlog = document.querySelector('.pictures');
  var similarPictureTemplate = document.querySelector('#picture')
    .content
    .querySelector('.picture');

  var imageSrc = similarPictureTemplate.querySelector('.picture__img');
  var commentText = similarPictureTemplate.querySelector('.picture__comments');
  var sumLikes = similarPictureTemplate.querySelector('.picture__likes');

  var fragment = document.createDocumentFragment();

  var bigPicturesBlock = document.querySelector('.big-picture');

  var socialCommentsBlocks = bigPicturesBlock.querySelector('.social__comments');
  socialCommentsBlocks.innerHTML = '';
  var similarCommentTemplate = document.querySelector('#social__comments')
    .content
    .querySelector('.social__comment');

  var imageSrcAvatar = similarCommentTemplate.querySelector('.social__picture');
  var socialText = similarCommentTemplate.querySelector('.social__text');

  var fragmentForComments = document.createDocumentFragment();

  var uploadFile = document.querySelector('#upload-file');

  var photoZoomInPhoto = document.querySelector('.scale__control--bigger');
  var photoZoomOutPhoto = document.querySelector('.scale__control--smaller');
  var photoZoomControl = document.querySelector('.scale__control--value');

  var valueControl = parseFloat(photoZoomControl.value);
  var imageZoom = document.querySelector('.img-upload__preview');
  var imageUpWindowClose = document.querySelector('.img-upload__cancel');

  var effectsListPhoto = document.querySelectorAll('input[name="effect"]');
  var imagePreview = document.querySelector('.img-upload__preview img');

  var effectLevelLine = document.querySelector('.effect-level__line');
  var effectLevelPin = document.querySelector('.effect-level__pin');

  var inputHashTags = document.querySelector('.text__hashtags');

  var textDescription = document.querySelector('.text__description');

  for (var i = 1; i <= SUM_PICTURES; i++) {
    commentsArr = [];
    createsRandomComments();
    createsPhoto(i);
    createsRandomNumber(pictures.length);
  }

  for (i = 0; i < SUM_PICTURES; i++) {
    addDataToTemplate(i);
  }
  addFragmentToParent(parentBlog, fragment);

  document.querySelector('.social__comment-count').classList.add('visually-hidden');
  document.querySelector('.comments-loader').classList.add('visually-hidden');

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
      }
      addFragmentToParent(socialCommentsBlocks, fragmentForComments);
    });
  });

  document.querySelector('.big-picture__cancel').addEventListener('click', function () {
    bigPicturesBlock.classList.add('hidden');
  });

  uploadFile.addEventListener('change', addedNewPhoto);
  imageZoom.style.transform = 'scale(' + valueControl / 100 + ')';
  imageUpWindowClose.addEventListener('click', closesWindowNewPhoto);

  document.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.KeyCode.ESC && document.activeElement !== textDescription && document.activeElement !== inputHashTags) {
      closesWindowNewPhoto();
    }
  });

  photoZoomInPhoto.addEventListener('click', function () {
    valueControl = (valueControl + ZOOM);
    zoomInOutPhoto(MAX_ZOOM, MIN_ZOOM);
  });

  photoZoomOutPhoto.addEventListener('click', function () {
    valueControl = (valueControl - ZOOM);
    zoomInOutPhoto(MAX_ZOOM, MIN_ZOOM);
  });

  effectsListPhoto.forEach(function (element) {
    element.addEventListener('click', changeEffect);
  });

  effectLevelPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    var startCoordinates = {
      x: evt.clientX,
    };
    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      var shift = {
        x: startCoordinates.x - moveEvt.clientX,
      };

      startCoordinates = {
        x: moveEvt.clientX,
      };

      var minShiftX = effectLevelLine.getBoundingClientRect().left;
      var maxShiftX = effectLevelLine.getBoundingClientRect().right;
      var widthPin = parseFloat(getComputedStyle(effectLevelPin).width);
      effectLevelPin.style.left = (effectLevelPin.offsetLeft - shift.x) + 'px';
      if (effectLevelPin.getBoundingClientRect().left < minShiftX - (widthPin / 2)) {
        effectLevelPin.style.left = 0 + 'px';
      }
      if (effectLevelPin.getBoundingClientRect().left > maxShiftX - (widthPin / 2)) {
        effectLevelPin.style.left = effectLevelLine.offsetWidth + 'px';
      }
      effectLevelLine.querySelector('.effect-level__depth')
        .style.width = (effectLevelPin.offsetLeft / effectLevelLine.offsetWidth)
        .toFixed(2) * 100 + '%';
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      changeEffectScroll();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

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
        for (i = 0; i < arr.length; i++) {
          var hashtag = arr[i];
          var hashPrevious = arr.slice(0, i);
          if (hashPrevious.indexOf(hashtag) > -1) {
            errorInputHash = '2-а одинаковых хэштега - НЕЛЬЗЯ';
          }
        }
      } else if (lengthHash > MAX_LENGTH_HASHTAG) {
        errorInputHash = 'Введено больше 25 символов для 1-го Хэштэга';
      } else if (arr.length > MAX_HASHTAGS) {
        errorInputHash = 'Введено больше 5 ХЭШТЭГОВ';
      }
      inputHashTags.setCustomValidity(errorInputHash);
    });
  };

  inputHashTags.addEventListener('input', function (evt) {
    var elementsHashTags = evt.target.value.trim().toLowerCase().split(' ');
    validations(elementsHashTags);

  });


  textDescription.addEventListener('change', function (evt) {
    var lengthDescription = evt.target.value.length;
    if (lengthDescription > 0 && lengthDescription < 2) {
      textDescription.setCustomValidity('Комментарий не может быть меньше 2-х символов');
    } else if (lengthDescription > 140) {
      textDescription.setCustomValidity('Комментарий не может быть больше 140 символов - сейчас у ВАС ' + lengthDescription + ' символ(а)(ов)');
    } else {
      textDescription.setCustomValidity('');
    }
  });

})();
