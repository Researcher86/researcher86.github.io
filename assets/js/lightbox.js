// Opens case screenshots in a <dialog> instead of navigating to the image,
// with previous/next through the screenshots of the same case.
// Without JS the links still open the image. Esc closes the dialog natively.
(function () {
  var groups = Array.prototype.slice.call(document.querySelectorAll('.work-shots'));
  if (!groups.length || typeof HTMLDialogElement !== 'function') return;

  var ru = document.documentElement.lang === 'ru';
  var t = ru
    ? { close: 'Закрыть', prev: 'Предыдущий скриншот', next: 'Следующий скриншот', left: 'Прокрутить влево', right: 'Прокрутить вправо' }
    : { close: 'Close', prev: 'Previous screenshot', next: 'Next screenshot', left: 'Scroll left', right: 'Scroll right' };

  function button(cls, label, text) {
    var b = document.createElement('button');
    b.type = 'button';
    b.className = cls;
    b.setAttribute('aria-label', label);
    b.textContent = text;
    return b;
  }

  var dialog = document.createElement('dialog');
  dialog.className = 'lightbox';
  var close = button('lightbox-close', t.close, '×');
  var prev = button('lightbox-nav lightbox-prev', t.prev, '‹');
  var next = button('lightbox-nav lightbox-next', t.next, '›');
  var img = document.createElement('img');
  var caption = document.createElement('p');
  caption.className = 'lightbox-caption';
  dialog.append(close, prev, img, next, caption);
  document.body.appendChild(dialog);

  var links = [];
  var index = 0;

  function show(i) {
    index = (i + links.length) % links.length;
    var link = links[index];
    var thumb = link.querySelector('img');
    img.src = link.href;
    img.alt = thumb ? thumb.alt : '';
    caption.textContent = (img.alt ? img.alt + ' · ' : '') + (links.length > 1 ? (index + 1) + ' / ' + links.length : '');
    prev.hidden = next.hidden = links.length < 2;
  }

  close.addEventListener('click', function () { dialog.close(); });
  prev.addEventListener('click', function () { show(index - 1); });
  next.addEventListener('click', function () { show(index + 1); });
  // A click outside the image lands on the dialog itself (the backdrop area).
  dialog.addEventListener('click', function (e) { if (e.target === dialog) dialog.close(); });
  dialog.addEventListener('keydown', function (e) {
    if (links.length < 2) return;
    if (e.key === 'ArrowLeft') { e.preventDefault(); show(index - 1); }
    if (e.key === 'ArrowRight') { e.preventDefault(); show(index + 1); }
  });
  dialog.addEventListener('close', function () { img.removeAttribute('src'); });

  groups.forEach(function (group) {
    var groupLinks = Array.prototype.slice.call(group.querySelectorAll('a'));
    groupLinks.forEach(function (link, i) {
      link.addEventListener('click', function (e) {
        e.preventDefault();
        links = groupLinks;
        show(i);
        dialog.showModal();
      });
    });

    // Scroll buttons for the horizontal strip; a mouse wheel cannot scroll it sideways.
    if (group.classList.contains('carousel')) {
      var wrap = document.createElement('div');
      wrap.className = 'carousel-controls';
      var left = button('carousel-btn', t.left, '‹');
      var right = button('carousel-btn', t.right, '›');
      left.addEventListener('click', function () { group.scrollBy({ left: -group.clientWidth * 0.8, behavior: 'smooth' }); });
      right.addEventListener('click', function () { group.scrollBy({ left: group.clientWidth * 0.8, behavior: 'smooth' }); });
      wrap.append(left, right);
      group.after(wrap);
    }
  });
})();
