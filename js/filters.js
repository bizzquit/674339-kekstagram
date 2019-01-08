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

  filterPopularButton.addEventListener('click', activatedButtonFilter);
  filterNewButton.addEventListener('click', activatedButtonFilter);

  filterDiscussedButton.addEventListener('click', function (event) {
    activatedButtonFilter(event);
    window.pictures.sortingList();
  });

})();
