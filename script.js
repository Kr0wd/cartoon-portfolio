// JS for dynamic effects, carousel, and scroll animations
document.addEventListener('DOMContentLoaded', () => {

    // --- 1. COMIC CARD ROTATIONS --- //
    // Add a slight random rotation to project cards & nda notice for that messy comic look
    const comicElements = document.querySelectorAll('.project-card, .nda-notice');
    comicElements.forEach(el => {
        const randomAngle = (Math.random() * 3) - 1.5; // -1.5 to 1.5 degrees
        el.style.transform = `rotate(${randomAngle}deg)`;

        // Ensure hover state resets or enhances the rotation
        el.addEventListener('mouseenter', () => {
            // For elements that are also animated on scroll, we must ensure the transform
            // respects the original translation.
            el.style.transform = `translate(-4px, -4px) rotate(${randomAngle}deg)`;
        });

        el.addEventListener('mouseleave', () => {
            el.style.transform = `rotate(${randomAngle}deg)`;
        });
    });

    // --- 2. MOBILE HAMBURGER --- //
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            if (navLinks.style.display === 'flex' && navLinks.style.flexDirection === 'column') {
                navLinks.style.display = ''; // reset
                navLinks.style.flexDirection = '';
                navLinks.style.position = '';
            } else {
                navLinks.style.display = 'flex';
                navLinks.style.flexDirection = 'column';
                navLinks.style.position = 'absolute';
                navLinks.style.top = '100%';
                navLinks.style.left = '0';
                navLinks.style.right = '0';
                navLinks.style.background = 'white';
                navLinks.style.padding = '1rem';
                navLinks.style.borderBottom = '4px solid black';
            }
        });
    }

    // --- 3. SCROLL ANIMATIONS (INTERSECTION OBSERVER) --- //
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                // Optional: stop observing once it has animated in once
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    animatedElements.forEach(el => observer.observe(el));

    // --- 4. MEDIA CAROUSEL --- //
    const track = document.querySelector('.carousel-track');
    if (track) {
        const slides = Array.from(track.children);
        const nextButton = document.querySelector('.next-btn');
        const prevButton = document.querySelector('.prev-btn');
        let currentIndex = 0;

        // Number of items visible based on window width
        const getVisibleItems = () => {
            if (window.innerWidth >= 1024) return 3;
            if (window.innerWidth >= 768) return 2;
            return 1;
        };

        const updateCarousel = () => {
            const visibleItems = getVisibleItems();
            const slideWidth = slides[0].getBoundingClientRect().width;

            // Prevent scrolling past the end
            const maxIndex = Math.max(0, slides.length - visibleItems);
            if (currentIndex > maxIndex) {
                currentIndex = maxIndex;
            }
            if (currentIndex < 0) {
                currentIndex = 0;
            }

            const amountToMove = -(slideWidth * currentIndex);
            track.style.transform = `translateX(${amountToMove}px)`;
        };

        nextButton.addEventListener('click', () => {
            const maxIndex = Math.max(0, slides.length - getVisibleItems());
            if (currentIndex < maxIndex) {
                currentIndex++;
                updateCarousel();
            }
        });

        prevButton.addEventListener('click', () => {
            if (currentIndex > 0) {
                currentIndex--;
                updateCarousel();
            }
        });

        // Update if the window changes size
        window.addEventListener('resize', updateCarousel);
    }

});
