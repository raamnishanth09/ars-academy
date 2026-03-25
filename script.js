/* ARS Academy – script.js */

/* ── Video Modal ─────────────────────────────────────── */
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

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') closeVideoModal();
});

/* ── Cursor Glow ─────────────────────────────────────── */
(function () {
  var glow = document.getElementById('cursorGlow');
  if (!glow) return;
  var mx = -200, my = -200;
  document.addEventListener('mousemove', function (e) {
    mx = e.clientX; my = e.clientY;
    glow.style.transform = 'translate(' + (mx - 200) + 'px,' + (my - 200) + 'px)';
  });
  document.addEventListener('mouseleave', function () {
    glow.style.opacity = '0';
  });
  document.addEventListener('mouseenter', function () {
    glow.style.opacity = '1';
  });
})();

/* ── DOM Ready ───────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', function () {

  /* Modal close */
  var modal = document.getElementById('videoModal');
  if (modal) {
    modal.addEventListener('click', function (e) {
      if (e.target === this) closeVideoModal();
    });
  }
  var modalClose = document.getElementById('videoModalClose');
  if (modalClose) modalClose.addEventListener('click', closeVideoModal);

  /* Video cards — hero + student reviews */
  document.querySelectorAll('.vcard').forEach(function (c) {
    c.addEventListener('click', function () { openVideoModal(c.dataset.video); });
  });

  /* Guru cards */
  document.querySelectorAll('.guru-card').forEach(function (c) {
    c.addEventListener('click', function () {
      var vid = c.dataset.video;
      if (vid) openVideoModal(vid);
    });
  });

  /* FAQ accordion */
  document.querySelectorAll('.faq-item').forEach(function (item) {
    var q = item.querySelector('.faq-q');
    if (!q) return;
    q.addEventListener('click', function () {
      var isOpen = item.classList.contains('active');
      document.querySelectorAll('.faq-item').forEach(function (i) { i.classList.remove('active'); });
      if (!isOpen) item.classList.add('active');
    });
  });

  /* Smooth scroll */
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  /* Stats counter */
  var statsSec = document.querySelector('.stats-sec');
  if (statsSec) {
    var counted = false;
    new IntersectionObserver(function (entries) {
      if (entries[0].isIntersecting && !counted) {
        counted = true;
        document.querySelectorAll('.sn').forEach(function (el) {
          var target = parseInt(el.dataset.count, 10);
          if (!target) return;
          var step = Math.ceil(target / 60);
          var cur = 0;
          var timer = setInterval(function () {
            cur = Math.min(cur + step, target);
            el.textContent = cur;
            if (cur >= target) clearInterval(timer);
          }, 18);
        });
      }
    }, { threshold: 0.4 }).observe(statsSec);
  }

  /* Scroll reveal */
  var revealObs = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        revealObs.unobserve(e.target);
      }
    });
  }, { threshold: 0.07 });

  document.querySelectorAll('.scroll-reveal').forEach(function (el, idx) {
    el.style.transitionDelay = (idx % 6) * 0.1 + 's';
    revealObs.observe(el);
  });

  /* Mobile sticky — hide when price-card visible */
  var sticky = document.getElementById('mobSticky');
  var priceCard = document.querySelector('.price-card');
  if (sticky && priceCard) {
    new IntersectionObserver(function (entries) {
      var vis = entries[0].isIntersecting;
      sticky.style.opacity = vis ? '0' : '1';
      sticky.style.pointerEvents = vis ? 'none' : 'auto';
    }, { threshold: 0.3 }).observe(priceCard);
  }

  /* ── GAIN CARDS AUTO SWIPE (mobile) ── */
  var gainSlider = document.querySelector('.gain-slider');
  if (gainSlider) {
    var gainCards = gainSlider.querySelectorAll('.gain-card');
    var gainDots  = document.querySelectorAll('.gain-dot');
    var gainIdx = 0;
    function setGainDot(idx) {
      gainDots.forEach(function(d) { d.classList.remove('active'); });
      if (gainDots[idx]) gainDots[idx].classList.add('active');
    }
    setInterval(function() {
      gainIdx = (gainIdx + 1) % gainCards.length;
      var cardLeft = gainCards[gainIdx].getBoundingClientRect().left;
      var sliderLeft = gainSlider.getBoundingClientRect().left;
      gainSlider.scrollLeft += cardLeft - sliderLeft;
      setGainDot(gainIdx);
    }, 3000);
    /* update dot on manual swipe */
    gainSlider.addEventListener('scroll', function() {
      var mid = gainSlider.scrollLeft + gainSlider.clientWidth / 2;
      gainCards.forEach(function(c, i) {
        if (c.offsetLeft <= mid && c.offsetLeft + c.offsetWidth > mid) {
          gainIdx = i; setGainDot(i);
        }
      });
    }, { passive: true });
  }

});
