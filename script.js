function openVideoModal(videoId) {
    const modal = document.getElementById('videoModal');
    const frame = document.getElementById('videoModalFrame');
    const iframe = document.createElement('iframe');
    iframe.src = 'https://www.youtube.com/embed/' + videoId + '?autoplay=1&rel=0&modestbranding=1&enablejsapi=1';
    iframe.allow = 'autoplay; encrypted-media; fullscreen';
    iframe.allowFullscreen = true;
    frame.innerHTML = '';
    frame.appendChild(iframe);
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
}

function closeVideoModal(e) {
    if (e && e.target !== document.getElementById('videoModal') && !e.target.classList.contains('video-modal-close')) return;
    const modal = document.getElementById('videoModal');
    document.getElementById('videoModalFrame').innerHTML = '';
    modal.classList.remove('open');
    document.body.style.overflow = '';
}

document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') closeVideoModal();
});

document.addEventListener('DOMContentLoaded', function () {

    // ========== FAQ ACCORDION ==========
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            faqItems.forEach(other => {
                if (other !== item) other.classList.remove('active');
            });
            item.classList.toggle('active');
        });
    });

    // ========== SMOOTH SCROLL ==========
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) target.scrollIntoView({ behavior: 'smooth', block: 'center' });
        });
    });

    // ========== CARD STAGGER ANIMATIONS ==========
    const cardSelectors = '.transform-card, .who-card, .testimonial-card';
    document.querySelectorAll(cardSelectors).forEach(el => {
        el.classList.add('anim-card');
        const siblings = [...el.parentElement.children].filter(c => c.classList.contains('anim-card'));
        el.style.transitionDelay = `${siblings.indexOf(el) * 0.12}s`;
    });

    // Curriculum list stagger
    document.querySelectorAll('.curriculum-list li').forEach((el, i) => {
        el.classList.add('anim-card');
        el.style.transitionDelay = `${i * 0.08}s`;
    });

    const cardObs = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                cardObs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.anim-card').forEach(el => cardObs.observe(el));

    // ========== ELEMENT SCROLL ANIMATIONS ==========
    const elObs = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                elObs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.price-box, .guarantee-box, .trust-stats, .video-grid').forEach(el => {
        el.classList.add('anim-el');
        elObs.observe(el);
    });

    // ========== H2 UNDERLINE ANIMATION ==========
    const h2Obs = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('h2-animated');
                h2Obs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('h2').forEach(el => h2Obs.observe(el));

    // ========== COUNTER ANIMATION ==========
    const counterObs = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const original = el.textContent;
                const num = parseInt(original.replace(/\D/g, ''));
                const suffix = original.replace(/\d/g, '');
                let current = 0;
                const increment = num / 60;
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= num) {
                        el.textContent = original;
                        clearInterval(timer);
                    } else {
                        el.textContent = Math.floor(current) + suffix;
                    }
                }, 25);
                counterObs.unobserve(el);
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('.stat span').forEach(el => counterObs.observe(el));

    // ========== VIDEO MARQUEE MODAL ==========
    const modal      = document.getElementById('videoModal');
    const modalIframe = document.getElementById('modalIframe');
    const modalName  = document.getElementById('modalName');
    const modalClose = document.getElementById('modalClose');
    const modalBackdrop = document.getElementById('modalBackdrop');

    function openModal(videoId, name, loc) {
        modalIframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`;
        modalName.textContent = `${name} — ${loc}, Tamil Nadu`;
        modal.classList.add('open');
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        modal.classList.remove('open');
        modalIframe.src = '';
        document.body.style.overflow = '';
    }

    // Click on any video card to open modal
    document.querySelectorAll('.vm-card').forEach(card => {
        card.addEventListener('click', () => {
            openModal(card.dataset.video, card.dataset.name, card.dataset.loc);
        });
    });

    modalClose.addEventListener('click', closeModal);
    modalBackdrop.addEventListener('click', closeModal);
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape') closeModal();
    });

});
