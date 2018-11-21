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

/* создаю массив фотографий pictures[]; и записываю в него данные от 1-25 со случайными данными*/
var pictures = [];
for (var i = 1; i <= sumPictures; i++) {
  /* Определяем случайное описание */
  var description = Math.floor(Math.random() * descriptions.length);
  /* Определяем случайный коммент и случайное кол-во */
  var commentArr = [];
  var randomNumber = Math.floor(Math.random() * maxComment) + 1;
  for (var n = 0; n < randomNumber; n++) {
    var commentRandom = Math.floor(Math.random() * comments.length);
    var commentObject = ({
      comments: comments[commentRandom]
    });
    commentArr.push(commentObject);
  }
  /* Определяем случайное кол-во лайков */
  var like = Math.floor(Math.random() * (maxPictureLike - minPictureLike) + minPictureLike);
  var object = ({
    url: 'photos/' + i + '.jpg',
    likes: like,
    comments: commentArr,
    description: descriptions[description]
  });
  /* добавляем элемент в конец массива*/
  pictures.push(object);
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
  imageSrc.setAttribute('src', pictures[i].url); // Вставляем адрес картинки
  commentText.textContent = pictures[i].comments.length; // Вставляем кол-во комментов
  sumLikes.textContent = pictures[i].likes; // Вставляем кол-во лайков
  /* Клонируем шаблон*/
  var pictureTemplate = similarPictureTemplate.cloneNode(true);
  /* добавляем в родителя*/
  fragment.appendChild(pictureTemplate);
}
parentBlog.appendChild(fragment);

/* Вставляем данные 1-го элемента массива фото в блок big-picture */
var bigPicturesBlock = document.querySelector('.big-picture');
var elementArr = 0; // 1-й элемент массива pictures[]
bigPicturesBlock.classList.remove('hidden');
bigPicturesBlock.querySelector('.big-picture__img img').setAttribute('src', pictures[0].url);
bigPicturesBlock.querySelector('.likes-count').textContent = pictures[elementArr].likes;
bigPicturesBlock.querySelector('.social__caption').textContent = pictures[elementArr].description;
bigPicturesBlock.querySelector('.comments-count').textContent = pictures[elementArr].comments.length;

/* Вставляем комментарии */
/* var socialCommentsBlocks = bigPicturesBlock.querySelector('.social__comments');
var socialCommentsBlock = bigPicturesBlock.querySelector('.social__comment').cloneNode(true);

var avatar = Math.floor(Math.random() * 6) + 1;

console.log(socialCommentsBlocks.children.length);
console.log(avatar);*/
/*
console.log('Случайный комментарий: - " ' + comments[comment] + ' "');
console.log('Случайное описание: - " ' + descriptions[description] + ' "');
console.log('Количество лайков: ' + like);
console.dir(pictures);
console.log(pictures[3].comments[comment].length);
*/
