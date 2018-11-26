'use strict';
/* Переменные */
var minPictureLike = 15; // минимальное кол-во лайков
var maxPictureLike = 200; // максимальное кол-во лайков
var sumPictures = 25; // Кол-во фотографий других пользователей
var maxComment = 15; // Максимальное кол-во комментов

/* 1)
     1.1) Создаю 2 массива с вариантами comments and descriptions;
     1.2) Создаю массив объектов со значениями: {url:*,likes:*,comments:*,descriptions:*}  */

/* массив коментариев */
var comments = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

/* массив описаний (description) */
var descriptions = [
  'Тестим новую камеру!',
  'Затусили с друзьями на море',
  'Как же круто тут кормят',
  'Отдыхаем...',
  'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......',
  'Вот это тачка!'
];

/* функция - Определяем случайное кол-во лайков */
function addRandomComment() {
  var commentRandom = Math.floor(Math.random() * comments.length);
  var commentObject = ({
    comment: comments[commentRandom]
  });
  commentsArr.push(commentObject);
}

/* Функция формирования объекта*/
function addPhotoObjects(numberPhoto) {
  var like = Math.floor(Math.random() * (maxPictureLike - minPictureLike) + minPictureLike);
  var object = ({
    url: 'photos/' + numberPhoto + '.jpg',
    likes: like,
    comments: commentsArr,
    description: descriptions[description]
  });
  /* добавляем элемент в конец массива*/
  pictures.push(object);
}

/* Функция - Случайный аватар*/
function showBigPhotoWithComments(numComments) {
  var avatar = Math.floor(Math.random() * 6) + 1;
  /* Подставляем данные */
  imageSrcAvatar.setAttribute('src', 'img/avatar-' + avatar + '.svg');
  socialText.textContent = pictures[elementArr].comments[numComments].comment;

  /* Копируем шаблон, пихаем в него данные и кидаем в родителя*/
  var socialTemplate = similarCommentTemplate.cloneNode(true);
  fragmentForComments.appendChild(socialTemplate);
}

/* Функция добавления данных в шаблон*/
function addDataToTemplete(arrElement) {
  imageSrc.setAttribute('src', pictures[arrElement].url); // Вставляем адрес картинки
  commentText.textContent = pictures[arrElement].comments.length; // Вставляем кол-во комментов
  sumLikes.textContent = pictures[arrElement].likes; // Вставляем кол-во лайков
  /* Клонируем шаблон*/
  var pictureTemplate = similarPictureTemplate.cloneNode(true);
  fragment.appendChild(pictureTemplate);
}


/* создаю массив фотографий pictures[]; и записываю в него данные от 1-25 со случайными данными*/
var pictures = [];
for (var i = 1; i <= sumPictures; i++) {
  var description = Math.floor(Math.random() * descriptions.length);
  var commentsArr = [];
  var randomNumber = Math.floor(Math.random() * maxComment) + 1;
  for (var n = 0; n < randomNumber; n++) {
    addRandomComment();
  }
  addPhotoObjects(i);
}

/* 2) Создание Шаблона  */
/* Находим контейнер родителя - куда будем вставлять */
var parentBlog = document.querySelector('.pictures');
/* Находим контейнер для копирования */
var similarPictureTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

var imageSrc = similarPictureTemplate.querySelector('.picture__img');
var commentText = similarPictureTemplate.querySelector('.picture__comments');
var sumLikes = similarPictureTemplate.querySelector('.picture__likes');

var fragment = document.createDocumentFragment();
for (i = 0; i < sumPictures; i++) {
  addDataToTemplete(i);
}
/* добавляем в родителя что получилось*/
parentBlog.appendChild(fragment);

/* Вставляем данные N-го элемента массива фото в блок big-picture */
var bigPicturesBlock = document.querySelector('.big-picture');
var elementArr = Math.floor(Math.random() * pictures.length); // N-й элемент массива pictures[]
bigPicturesBlock.classList.remove('hidden');
bigPicturesBlock.querySelector('.big-picture__img img')
  .setAttribute('src', pictures[elementArr].url);
bigPicturesBlock.querySelector('.likes-count')
  .textContent = pictures[elementArr].likes;
bigPicturesBlock.querySelector('.social__caption')
  .textContent = pictures[elementArr].description;
bigPicturesBlock.querySelector('.comments-count')
  .textContent = pictures[elementArr]
  .comments.length;

/* Вставляем комментарии */
var socialCommentsBlocks = bigPicturesBlock.querySelector('.social__comments'); // Родитель для комментов
socialCommentsBlocks.innerHTML = ''; // Чистим контейнер с комментами
var similarCommentTemplate = document.querySelector('#social__comments')
  .content
  .querySelector('.social__comment');

/* Прячем счетчик коментов и загрузку новых*/
document.querySelector('.social__comment-count').classList.add('visually-hidden');
document.querySelector('.comments-loader').classList.add('visually-hidden');


/* Делаем цикл по добавлению комментов в Биг-Фото
 1) Определяем сколько коментов и пихаем в переменную commentLegth */
var fragmentForComments = document.createDocumentFragment();
var imageSrcAvatar = similarCommentTemplate.querySelector('.social__picture');
var socialText = similarCommentTemplate.querySelector('.social__text');

for (var y = 0; y < pictures[elementArr].comments.length; y++) {
  showBigPhotoWithComments(y);
}
socialCommentsBlocks.appendChild(fragmentForComments);


/*
console.log(pictures[elementArr].comments.length);
console.log(pictures);
console.log(pictures[0].comments[0].comment);
console.log(socialCommentsBlocks.children.length);
console.log(avatar);
console.log('Случайный комментарий: - " ' + comments[comment] + ' "');
console.log('Случайное описание: - " ' + descriptions[description] + ' "');
console.log('Количество лайков: ' + like);
console.dir(pictures);
console.log(pictures[3].comments[comment].length);
*/
