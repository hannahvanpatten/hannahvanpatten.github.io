/* main.js — shared across all pages */
 
document.addEventListener('DOMContentLoaded', () => {
 
 /* ── Custom Cursor ─────────────────────────── */
 const cursor = document.querySelector('.cursor');
 const cursorRing = document.querySelector('.cursor-ring');
 
 if (cursor && cursorRing) {
 let mx = 0, my = 0, rx = 0, ry = 0;
 
 document.addEventListener('mousemove', e => {
 mx = e.clientX; my = e.clientY;
 cursor.style.left = mx + 'px';
 cursor.style.top = my + 'px';
 });
 
 (function animateRing() {
 rx += (mx - rx) * 0.12;
 ry += (my - ry) * 0.12;
 cursorRing.style.left = rx + 'px';
 cursorRing.style.top = ry + 'px';
 requestAnimationFrame(animateRing);
 })();
 }
 
 /* ── Nav: scroll state ─────────────────────── */
 const nav = document.querySelector('nav');
 if (nav) {
 const onScroll = () => {
 nav.classList.toggle('scrolled', window.scrollY > 40);
 };
 window.addEventListener('scroll', onScroll, { passive: true });
 onScroll();
 }
 
 /* ── Nav: active link ──────────────────────── */
 const currentPath = window.location.pathname.split('/').pop() || 'index.html';
 document.querySelectorAll('.nav-links a').forEach(link => {
 const href = link.getAttribute('href');
 if (href === currentPath || (currentPath === '' && href === 'index.html')) {
 link.classList.add('active');
 }
 });
 
 /* ── Mobile nav toggle ─────────────────────── */
 const toggle = document.querySelector('.nav-toggle');
 const navLinks = document.querySelector('.nav-links');
 if (toggle && navLinks) {
 toggle.addEventListener('click', () => {
 navLinks.classList.toggle('open');
 const isOpen = navLinks.classList.contains('open');
 toggle.setAttribute('aria-expanded', isOpen);
 toggle.querySelectorAll('span')[0].style.transform = isOpen ? 'rotate(45deg) translate(4px, 4px)' : '';
 toggle.querySelectorAll('span')[1].style.opacity = isOpen ? '0' : '1';
 toggle.querySelectorAll('span')[2].style.transform = isOpen ? 'rotate(-45deg) translate(4px, -4px)' : '';
 });
 
 navLinks.querySelectorAll('a').forEach(a => {
 a.addEventListener('click', () => navLinks.classList.remove('open'));
 });
 }
 
 /* ── Scroll reveal ─────────────────────────── */
 const reveals = document.querySelectorAll('.reveal');
 if ('IntersectionObserver' in window) {
 const io = new IntersectionObserver(entries => {
 entries.forEach(entry => {
 if (entry.isIntersecting) {
 entry.target.classList.add('visible');
 io.unobserve(entry.target);
 }
 });
 }, { threshold: 0.12 });
 
 reveals.forEach(el => io.observe(el));
 } else {
 reveals.forEach(el => el.classList.add('visible'));
 }
 
 /* ── Projects filter ───────────────────────── */
 const filterBtns = document.querySelectorAll('.filter-btn');
 const projectCards = document.querySelectorAll('.project-card[data-category]');
 
 if (filterBtns.length && projectCards.length) {
 filterBtns.forEach(btn => {
 btn.addEventListener('click', () => {
 filterBtns.forEach(b => b.classList.remove('active'));
 btn.classList.add('active');
 const cat = btn.dataset.filter;
 
 projectCards.forEach(card => {
 const cats = card.dataset.category || '';
 const show = cat === 'all' || cats.includes(cat);
 card.style.opacity = show ? '1' : '0.2';
 card.style.pointerEvents = show ? 'auto' : 'none';
 });
 });
 });
 }
 
 /* ── Current year in footer ────────────────── */
 const yearEl = document.querySelector('.footer-year');
 if (yearEl) yearEl.textContent = new Date().getFullYear();
 
});

/* Image carousel */
const images = [
            { src: 'eng_without_ret_code_snip_1.png', alt: 'Data Cleaning Snippet' },
            { src: 'eng_without_ret_code_snip_2.png', alt: 'Data Cleaning Snippet' },
            { src: 'eng_without_ret_code_snip_3.png', alt: 'Data Cleaning Snippet' },
            { src: 'eng_without_ret_code_snip_4.png', alt: 'Data Cleaning Snippet' },
            { src: 'eng_without_ret_code_snip_5.png', alt: 'Data Cleaning Snippet' },
            // Add more images here
        ];

        let currentSlideIndex = 0;
        let autoPlayInterval;

        // Initialize carousel
        function initCarousel() {
            const carouselInner = document.getElementById('carouselInner');
            const indicatorContainer = document.getElementById('indicatorContainer');

            // Create slides
            images.forEach((image, index) => {
                const slide = document.createElement('div');
                slide.className = `carousel-slide ${index === 0 ? 'active' : ''}`;
                slide.innerHTML = `<img src="${image.src}" alt="${image.alt}">`;
                carouselInner.appendChild(slide);

                // Create indicator dots
                const dot = document.createElement('div');
                dot.className = `dot ${index === 0 ? 'active' : ''}`;
                dot.onclick = () => goToSlide(index);
                indicatorContainer.appendChild(dot);
            });

            document.getElementById('totalSlides').textContent = images.length;
            updateButtonStates();
            startAutoPlay();
        }

        function goToSlide(index) {
            const slides = document.querySelectorAll('.carousel-slide');
            const dots = document.querySelectorAll('.dot');

            // Remove active class
            slides.forEach(slide => slide.classList.remove('active'));
            dots.forEach(dot => dot.classList.remove('active'));

            // Add active class to current slide and dot
            slides[index].classList.add('active');
            dots[index].classList.add('active');

            currentSlideIndex = index;
            document.getElementById('currentSlide').textContent = index + 1;
            updateButtonStates();
            resetAutoPlay();
        }

        function nextSlide() {
            if (currentSlideIndex < images.length - 1) {
                goToSlide(currentSlideIndex + 1);
            }
        }

        function previousSlide() {
            if (currentSlideIndex > 0) {
                goToSlide(currentSlideIndex - 1);
            }
        }

        function updateButtonStates() {
            const prevBtn = document.getElementById('prevBtn');
            const nextBtn = document.getElementById('nextBtn');

            prevBtn.disabled = currentSlideIndex === 0;
            nextBtn.disabled = currentSlideIndex === images.length - 1;
        }

        function startAutoPlay() {
            autoPlayInterval = setInterval(() => {
                if (currentSlideIndex < images.length - 1) {
                    goToSlide(currentSlideIndex + 1);
                }
            }, 15000); // Change slide every 15 seconds
        }

        function resetAutoPlay() {
            clearInterval(autoPlayInterval);
            startAutoPlay();
        }

        // Stop autoplay on user interaction
        document.addEventListener('click', () => {
            if (event.target.tagName === 'BUTTON' || event.target.classList.contains('dot')) {
                resetAutoPlay();
            }
        });

        // Initialize on page load
        document.addEventListener('DOMContentLoaded', initCarousel);