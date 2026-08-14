/* ==========================================================================
   Izbasar Mamyrov — Personal Brand Website JavaScript Logic
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide Icons
    if (window.lucide) {
        window.lucide.createIcons();
    }

    // Set Dynamic Year in Footer
    const yearSpan = document.getElementById('currentYear');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // Header Scroll State
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 40) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Mobile Menu Toggle
    const mobileToggle = document.getElementById('mobileToggle');
    const navMenu = document.getElementById('navMenu');
    const menuIcon = document.getElementById('menuIcon');
    
    if (mobileToggle && navMenu) {
        function toggleMenu(show) {
            const isActive = typeof show === 'boolean' ? show : !navMenu.classList.contains('active');
            navMenu.classList.toggle('active', isActive);
            document.body.style.overflow = isActive ? 'hidden' : '';
            
            if (menuIcon && window.lucide) {
                menuIcon.setAttribute('data-lucide', isActive ? 'x' : 'menu');
                window.lucide.createIcons();
            }
        }

        mobileToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleMenu();
        });

        // Close menu on link click
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                toggleMenu(false);
            });
        });

        // Close menu on click outside
        document.addEventListener('click', (e) => {
            if (navMenu.classList.contains('active') && !navMenu.contains(e.target) && !mobileToggle.contains(e.target)) {
                toggleMenu(false);
            }
        });
    }

    // YouTube Video Modal Player Logic
    const playVideoBtn = document.getElementById('playVideoBtn');
    const thumbnailWrapper = document.getElementById('thumbnailWrapper');
    const videoModal = document.getElementById('videoModal');
    const modalOverlay = document.getElementById('modalOverlay');
    const modalClose = document.getElementById('modalClose');
    const iframeContainer = document.getElementById('iframeContainer');

    const youtubeVideoId = '9SkViTOsVJ8';

    function openVideoModal() {
        if (videoModal && iframeContainer) {
            iframeContainer.innerHTML = `
                <iframe 
                    src="https://www.youtube.com/embed/${youtubeVideoId}?autoplay=1&rel=0&enablejsapi=1" 
                    title="Как изменить свою жизнь через изменение состояния? — Избасар Мамыров"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                    allowfullscreen>
                </iframe>
            `;
            videoModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }

    function closeVideoModal() {
        if (videoModal && iframeContainer) {
            videoModal.classList.remove('active');
            iframeContainer.innerHTML = '';
            document.body.style.overflow = '';
        }
    }

    if (playVideoBtn) playVideoBtn.addEventListener('click', openVideoModal);
    if (thumbnailWrapper) thumbnailWrapper.addEventListener('click', openVideoModal);
    if (modalOverlay) modalOverlay.addEventListener('click', closeVideoModal);
    if (modalClose) modalClose.addEventListener('click', closeVideoModal);

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && videoModal && videoModal.classList.contains('active')) {
            closeVideoModal();
        }
    });

    // Scroll Reveal Animation (Intersection Observer)
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal-active');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.request-card, .step-card, .approach-box, .booking-box, .video-card-main, .book-card-main').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
        observer.observe(el);
    });

    // Add Reveal Class dynamically
    document.addEventListener('scroll', () => {
        document.querySelectorAll('.reveal-active').forEach(el => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        });
    });
});
