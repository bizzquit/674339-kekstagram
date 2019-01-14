'use strict';
(function () {
  var imageFile = document.querySelector('#upload-file');
  var imagPreview = document.querySelector('.img-upload__preview img');

  imageFile.addEventListener('input', function (evt) {
    var upLoad = evt.target;
    if (upLoad.files && upLoad.files[0]) {
      var reader = new FileReader();
      reader.onload = function (event) {
        imagPreview.setAttribute('src', event.target.result);
        imagPreview.style.blockSize = 'inherit';
      };
      reader.readAsDataURL(upLoad.files[0]);
    }
  });

})();
