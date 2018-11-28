'use strict';
var MIN_PICTURE_LIKE = 15; // минимальное кол-во лайков
var MAX_PICTURE_LIKE = 200; // максимальное кол-во лайков
var SUM_PICTURES = 25; // Кол-во фотографий других пользователей
var MAX_COMMENT = 7; // Максимальное кол-во комментов

function createsRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

/**
 * функция для генерации массива случайных комментариев
 * @function
 */
function createsRandomComments() {
  for (var n = 0; n < createsRandomNumber(1, MAX_COMMENT); n++) {
    commentsArr.push({
      comment: comments[createsRandomNumber(0, comments.length)]
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
    likes: createsRandomNumber(MIN_PICTURE_LIKE, MAX_PICTURE_LIKE),
    comments: commentsArr,
    description: descriptions[createsRandomNumber(0, descriptions.length)]
  });
}


/**
 * Функция заполняет данные увеличеной фотографиию.
 * @function
 * @param {number} numComments элеммент массива pictures[].
 */
function showBigPhotoWithComments(numComments) {
  imageSrcAvatar.setAttribute('src', 'img/avatar-' + createsRandomNumber(7, 1) + '.svg');
  socialText.textContent = pictures[elementArr].comments[numComments].comment;
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
 * Функция добавляет элементы фотографии в разметку
 * @function
 */
function addValuesToBigPhoto() {
  bigPicturesBlock.querySelector('.big-picture__img img')
    .setAttribute('src', pictures[elementArr].url);
  bigPicturesBlock.querySelector('.likes-count')
    .textContent = pictures[elementArr].likes;
  bigPicturesBlock.querySelector('.social__caption')
    .textContent = pictures[elementArr].description;
  bigPicturesBlock.querySelector('.comments-count')
    .textContent = pictures[elementArr]
    .comments.length;
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


var elementArr;
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
  elementArr = createsRandomNumber(0, pictures.length)
}

for (i = 0; i < SUM_PICTURES; i++) {
  addDataToTemplate(i);
}
addFragmentToParent(parentBlog, fragment);

bigPicturesBlock.classList.remove('hidden');

addValuesToBigPhoto();

document.querySelector('.social__comment-count').classList.add('visually-hidden');
document.querySelector('.comments-loader').classList.add('visually-hidden');

for (var y = 0; y < pictures[elementArr].comments.length; y++) {
  showBigPhotoWithComments(y);
}
addFragmentToParent(socialCommentsBlocks, fragmentForComments);
