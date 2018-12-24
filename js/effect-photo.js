'use strict';
(function () {
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

  var effectsListPhoto = document.querySelectorAll('input[name="effect"]');
  var imagePreview = document.querySelector('.img-upload__preview img');
  var effectLevelLine = document.querySelector('.effect-level__line');
  var effectLevelPin = document.querySelector('.effect-level__pin');


  var changeEffectLineDepth = function () {
    effectLevelLine.querySelector('.effect-level__depth')
      .style.width = (effectLevelPin.offsetLeft / effectLevelLine.offsetWidth)
      .toFixed(2) * 100 + '%';
  };


  effectsListPhoto.forEach(function (element) {
    element.addEventListener('click', changeEffect);
  });

  effectLevelLine.addEventListener('mousedown', function (evt) {
    if (evt.target.className === 'effect-level__line' || evt.target.className === 'effect-level__depth') {
      effectLevelPin.style.left = evt.offsetX + 'px';
      changeEffectScroll();
      changeEffectLineDepth();
    } else if (evt.target.className === 'effect-level__pin') {
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
        changeEffectLineDepth();
      };

      var onMouseUp = function (upEvt) {
        upEvt.preventDefault();
        changeEffectScroll();
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
      };

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    }
  });

})();
