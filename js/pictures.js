'use strict';
(function () {

  var MIN_PICTURE_LIKE = 15; // минимальное кол-во лайков
  var MAX_PICTURE_LIKE = 200; // максимальное кол-во лайков
  var SUM_PICTURES = 25; // Кол-во фотографий других пользователей
  var MAX_COMMENT = 7; // Максимальное кол-во комментов

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
        comment: window.data.comments[createsRandomNumber(window.data.comments.length)]
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
      description: window.data.descriptions[createsRandomNumber(window.data.descriptions.length)]
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


})();
