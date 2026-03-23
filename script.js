/* ── VIDEO MODAL ── */
function openVideoModal(videoId) {
  var modal = document.getElementById('videoModal');
  var frame = document.getElementById('videoModalFrame');
  var iframe = document.createElement('iframe');
  iframe.src = 'https://www.youtube-nocookie.com/embed/' + videoId + '?autoplay=1&rel=0&modestbranding=1&enablejsapi=1';
  iframe.setAttribute('allow', 'autoplay; accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen');
  iframe.setAttribute('allowfullscreen', '');
  iframe.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;border:0;';
  frame.innerHTML = '';
  frame.appendChild(iframe);
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeVideoModal() {
  var modal = document.getElementById('videoModal');
  document.getElementById('videoModalFrame').innerHTML = '';
  modal.classList.remove('open');
  document.body.style.overflow = '';
}

document.addEventListener('DOMContentLoaded', function () {

  /* Modal close */
  document.getElementById('videoModal').addEventListener('click', function (e) {
    if (e.target === this) closeVideoModal();
  });
  document.getElementById('videoModalClose').addEventListener('click', closeVideoModal);

  /* ── FAQ ACCORDION ── */
  document.querySelectorAll('.faq-item').forEach(function (item) {
    item.querySelector('.faq-q').addEventListener('click', function () {
      var isOpen = item.classList.contains('active');
      document.querySelectorAll('.faq-item').forEach(function (i) { i.classList.remove('active'); });
      if (!isOpen) item.classList.add('active');
    });
  });

  /* ── SMOOTH SCROLL ── */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      var target = document.querySelector(this.getAttribute('href'));
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  /* ── VIDEO CARD CLICK ── */
  document.querySelectorAll('.vm-card').forEach(function (card) {
    card.addEventListener('click', function () {
      openVideoModal(card.dataset.video);
    });
  });

  /* ── STATS COUNTER ── */
  var counterDone = false;
  var statsStrip = document.querySelector('.stats-strip');
  if (statsStrip) {
    var statsObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting && !counterDone) {
          counterDone = true;
          document.querySelectorAll('.stat-num').forEach(function (el) {
            var target = parseInt(el.dataset.count, 10);
            var step   = Math.ceil(target / 60);
            var current = 0;
            var timer = setInterval(function () {
              current += step;
              if (current >= target) { el.textContent = target; clearInterval(timer); }
              else { el.textContent = current; }
            }, 22);
          });
        }
      });
    }, { threshold: 0.4 });
    statsObs.observe(statsStrip);
  }

  /* ── REVEAL ON SCROLL ── */
  var revealObs = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.reveal').forEach(function (el, i) {
    el.style.transitionDelay = (i % 6) * 0.08 + 's';
    revealObs.observe(el);
  });

});

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') closeVideoModal();
});
