document.addEventListener('DOMContentLoaded', () => {
    // 1. Reveal animations on scroll
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // observer.unobserve(entry.target); // Remove if we want it to hide again when scrolled past
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-up').forEach(el => {
        observer.observe(el);
    });

    // 2. Parallax Background & Slow Scroll Effects
    const parallaxElements = document.querySelectorAll('.parallax');
    const slowParallaxElements = document.querySelectorAll('.parallax-slow');
    const zTexts = document.querySelectorAll('.z-text');
    const zTextSubs = document.querySelectorAll('.z-text-sub');

    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        
        parallaxElements.forEach(el => {
            const speed = 0.4;
            el.style.transform = `translateY(${scrolled * speed}px)`;
        });

        slowParallaxElements.forEach(el => {
            const position = el.getBoundingClientRect().top;
            if(position < window.innerHeight && position > -el.offsetHeight) {
                const speed = 0.08;
                el.style.transform = `translateY(${(position - window.innerHeight/2) * speed}px)`;
            }
        });

        zTexts.forEach(el => {
           const speed = 0.2;
           el.style.transform = `translateZ(50px) translateY(${scrolled * speed}px)`;
        });
        
        zTextSubs.forEach(el => {
           const speed = 0.3;
           el.style.transform = `translateZ(20px) translateY(${scrolled * speed}px)`;
        });
    });

    // 3. 3D Tilt Effect on Cards (for desktop)
    const tiltCards = document.querySelectorAll('.tilt-card');
    
    // Only apply tilt on non-touch devices
    if(window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
        tiltCards.forEach(card => {
            const inner = card.querySelector('.tilt-inner');
            
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                
                // Calculate rotation (max 10 degrees)
                const rotateX = -(y / (rect.height / 2)) * 10;
                const rotateY = (x / (rect.width / 2)) * 10;
                
                inner.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            });
            
            card.addEventListener('mouseleave', () => {
                inner.style.transform = `rotateX(0deg) rotateY(0deg)`;
                // Adding transition for smooth return
                inner.style.transition = 'transform 0.5s ease-out';
                setTimeout(() => {
                    inner.style.transition = 'transform 0.1s ease-out';
                }, 500);
            });
        });
    }
});
