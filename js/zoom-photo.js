'use strict';
(function () {
  var ZOOM = 25; // Шаг зумирования
  var MIN_ZOOM = 25; // минимальное значение зума
  var MAX_ZOOM = 100; // максимальное значение зума

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

  var photoZoomInPhoto = document.querySelector('.scale__control--bigger');
  var photoZoomOutPhoto = document.querySelector('.scale__control--smaller');
  var photoZoomControl = document.querySelector('.scale__control--value');
  var valueControl = parseFloat(photoZoomControl.value);
  var imageZoom = document.querySelector('.img-upload__preview');

  imageZoom.style.transform = 'scale(' + valueControl / 100 + ')';

  photoZoomInPhoto.addEventListener('click', function () {
    valueControl = (valueControl + ZOOM);
    zoomInOutPhoto(MAX_ZOOM, MIN_ZOOM);
  });

  photoZoomOutPhoto.addEventListener('click', function () {
    valueControl = (valueControl - ZOOM);
    zoomInOutPhoto(MAX_ZOOM, MIN_ZOOM);
  });

})();
