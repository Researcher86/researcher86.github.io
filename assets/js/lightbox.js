// Opens case screenshots in a <dialog> instead of navigating to the image.
// Without JS the links still open the image. Esc closes the dialog natively.
(function () {
  var links = document.querySelectorAll('.work-shots a');
  if (!links.length || typeof HTMLDialogElement !== 'function') return;

  var dialog = document.createElement('dialog');
  dialog.className = 'lightbox';
  var close = document.createElement('button');
  close.type = 'button';
  close.className = 'lightbox-close';
  close.setAttribute('aria-label', document.documentElement.lang === 'ru' ? 'Закрыть' : 'Close');
  close.textContent = '×';
  var img = document.createElement('img');
  dialog.append(close, img);
  document.body.appendChild(dialog);

  close.addEventListener('click', function () { dialog.close(); });
  // A click outside the image lands on the dialog itself (the backdrop area).
  dialog.addEventListener('click', function (e) { if (e.target === dialog) dialog.close(); });
  dialog.addEventListener('close', function () { img.removeAttribute('src'); });

  links.forEach(function (link) {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      var thumb = link.querySelector('img');
      img.src = link.href;
      img.alt = thumb ? thumb.alt : '';
      dialog.showModal();
    });
  });
})();
