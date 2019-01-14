'use strict';

(function () {
  var filtersContainer = document.querySelector('.img-filters');

  var activatedButtonFilter = function (evt) {
    filtersContainer.querySelectorAll('.img-filters__button').forEach(function (n) {
      n.classList.remove('img-filters__button--active');
    });
    window.pictures.deletingPhotos();
    evt.target.classList.add('img-filters__button--active');
  };

  filtersContainer.querySelectorAll('.img-filters__button').forEach(function (n) {
    var idElement = n.id;
    n.addEventListener('click', function (evt) {
      if (idElement === 'filter-popular') {
        activatedButtonFilter(evt);
        window.pictures.createdPhotos(window.originData);
      } else if (idElement === 'filter-new') {
        activatedButtonFilter(evt);
        var photosNew = [];
        var randomNum = [];
        var i = 0;
        var amountPhotos = 10;
        while (i < amountPhotos) {
          var y = Math.floor(Math.random() * (window.originData.length));
          var ranNumPrevious = randomNum.slice(0, i);
          if (ranNumPrevious.indexOf(y) === -1) {
            randomNum.push(y);
            i++;
          }
        }
        for (var j = 0; j < randomNum.length; j++) {
          var x = randomNum[j];
          photosNew.push(window.originData[x]);
        }
        window.pictures.createdPhotos(photosNew);
      } else if (idElement === 'filter-discussed') {
        activatedButtonFilter(evt);
        window.pictures.sortingListDiscus();
      }
    });
  });
  window.filters = {
    filtersContainer: filtersContainer
  };

})();
