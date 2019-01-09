'use strict';

(function () {
  var filterPopularButton = window.backend.filtersContainer.querySelector('#filter-popular');
  var filterNewButton = window.backend.filtersContainer.querySelector('#filter-new');
  var filterDiscussedButton = window.backend.filtersContainer.querySelector('#filter-discussed');


  var activatedButtonFilter = function (evt) {
    filterPopularButton.classList.remove('img-filters__button--active');
    filterNewButton.classList.remove('img-filters__button--active');
    filterDiscussedButton.classList.remove('img-filters__button--active');
    window.pictures.deletingPhotos();
    evt.target.classList.add('img-filters__button--active');
  };

  filterPopularButton.addEventListener('click', function (event) {
    activatedButtonFilter(event);
    window.pictures.createdPhotos(window.originData);
  });
  filterNewButton.addEventListener('click', function (event) {
    activatedButtonFilter(event);
    var photosNew = [];
    var randomNum = [];
    var i = 0;
    while (i < 10) {
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
  });

  filterDiscussedButton.addEventListener('click', function (event) {
    activatedButtonFilter(event);
    window.pictures.sortingListDiscus();
  });

})();
