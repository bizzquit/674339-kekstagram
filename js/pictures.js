'use strict';
/* Переменные */
var minPictureLike = 15; // минимальное кол-во лайков
var maxPictureLike = 200; // максимальное кол-во лайков
var sumPictures = 25; // Кол-во фотографий других пользователей

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
  /* Определяем случайный коммент */
  var comment = Math.floor(Math.random() * comments.length);
  /* Определяем случайное кол-во лайков */
  var like = Math.floor(Math.random() * (maxPictureLike - minPictureLike) + minPictureLike);
  var object = ({
    url: 'photos/' + i + '.jpg',
    likes: like,
    comments: comments[comment],
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
  .querySelector('.picture_img');


/* Клонируем шаблон*/

var pictureTemplate = similarPictureTemplate.cloneNode(true);

/* добавляем в родителя*/
parentBlog.appendChild(pictureTemplate);


/*
console.log('Случайный комментарий: - " ' + comments[comment] + ' "');
console.log('Случайное описание: - " ' + descriptions[description] + ' "');
console.log('Количество лайков: ' + like);
console.dir(pictures);*/
