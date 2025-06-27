(() => {
  'use strict';

  const form = document.querySelector('.needs-validation');

  form.addEventListener(
    'submit',
    (event) => {
      if (!form.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
      }
      form.classList.add('was-validated');
    },
    false
  );
})();
function previewImage(event) {
  const fileInput = event.target;
  const preview = document.getElementById('imagePreview');

  const file = fileInput.files[0];
  if (file && file.type.startsWith('image/')) {
    const reader = new FileReader();
    reader.onload = function (e) {
      preview.src = e.target.result;
      preview.classList.add('show');
    };
    reader.readAsDataURL(file);
  } else {
    preview.src = '#';
    preview.classList.remove('show');
  }
}
