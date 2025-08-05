const fileInput = document.getElementById('fileInput');
const preview = document.getElementById('preview');
const cleanButton = document.getElementById('cleanButton');
const downloadLink = document.getElementById('downloadLink');
let imageFile;

fileInput.addEventListener('change', function () {
  const file = this.files[0];
  if (!file) return;

  imageFile = file;

  const reader = new FileReader();
  reader.onload = function (e) {
    preview.src = e.target.result;
    preview.style.display = 'block';
    downloadLink.style.display = 'none';
  };
  reader.readAsDataURL(file);
});

cleanButton.addEventListener('click', function () {
  if (!imageFile) return alert("Sélectionne une image d'abord.");

  const img = new Image();
  img.onload = function () {
    const canvas = document.createElement('canvas');
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0);

    // Réencodage sans les métadonnées EXIF
    canvas.toBlob(blob => {
      const url = URL.createObjectURL(blob);
      downloadLink.href = url;
      downloadLink.style.display = 'inline-block';
    }, 'image/jpeg', 0.95);
  };
  img.src = URL.createObjectURL(imageFile);
});
