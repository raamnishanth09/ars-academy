/* ARS Academy – script.js */

function openVideoModal(id) {
  var m = document.getElementById('videoModal');
  var f = document.getElementById('videoModalFrame');
  var i = document.createElement('iframe');
  i.src = 'https://www.youtube-nocookie.com/embed/' + id + '?autoplay=1&rel=0&modestbranding=1';
  i.setAttribute('allow', 'autoplay; accelerometer; clipboard-write; encrypted-media; picture-in-picture; fullscreen');
  i.setAttribute('allowfullscreen', '');
  i.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;border:0;';
  f.innerHTML = '';
  f.appendChild(i);
  m.classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeVideoModal() {
  document.getElementById('videoModalFrame').innerHTML = '';
  document.getElementById('videoModal').classList.remove('open');
  document.body.style.overflow = '';
}

document.addEventListener('DOMContentLoaded', function () {

  /* Modal */
  document.getElementById('videoModal').addEventListener('click', function (e) {
    if (e.target === this) closeVideoModal();
  });
  document.getElementById('videoModalClose').addEventListener('click', closeVideoModal);

  /* Video cards */
  document.querySelectorAll('.vcard').forEach(function (c) {
    c.addEventListener('click', function () { openVideoModal(c.dataset.video); });
  });

  /* FAQ */
  document.querySelectorAll('.faq-item').forEach(function (item) {
    item.querySelector('.faq-q').addEventListener('click', function () {
      var open = item.classList.contains('active');
      document.querySelectorAll('.faq-item').forEach(function (i) { i.classList.remove('active'); });
      if (!open) item.classList.add('active');
    });
  });

  /* Smooth scroll */
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      e.preventDefault();
      var t = document.querySelector(this.getAttribute('href'));
      if (t) t.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  /* Stats counter */
  var counted = false;
  var statsEl = document.querySelector('.stats-sec');
  if (statsEl) {
    new IntersectionObserver(function (entries) {
      if (entries[0].isIntersecting && !counted) {
        counted = true;
        document.querySelectorAll('.stat-n').forEach(function (el) {
          var target = parseInt(el.dataset.count, 10);
          var step = Math.ceil(target / 55);
          var cur = 0;
          var t = setInterval(function () {
            cur = Math.min(cur + step, target);
            el.textContent = cur;
            if (cur >= target) {
              clearInterval(t);
              el.classList.add('done');
            }
          }, 20);
        });
      }
    }, { threshold: 0.5 }).observe(statsEl);
  }

  /* Reveal on scroll */
  var obs = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); }
    });
  }, { threshold: 0.08 });

  document.querySelectorAll('.reveal-up').forEach(function (el, i) {
    el.style.transitionDelay = (i % 5) * 0.09 + 's';
    obs.observe(el);
  });

  /* Mobile sticky: show after topbar hides, hide when price box visible */
  var sticky = document.getElementById('mobileSticky');
  var priceBox = document.querySelector('.price-outer');
  if (sticky && priceBox) {
    new IntersectionObserver(function (entries) {
      sticky.style.opacity = entries[0].isIntersecting ? '0' : '1';
      sticky.style.pointerEvents = entries[0].isIntersecting ? 'none' : 'auto';
    }, { threshold: 0.5 }).observe(priceBox);
  }

});

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') closeVideoModal();
});
