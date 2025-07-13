document.addEventListener('DOMContentLoaded', function() {
    // Typed.js initialization
    var typed = new Typed(".text", {
        strings: ["Cybersecurity Researcher", "Ethical Hacker", "Software Developer"],
        typeSpeed: 100,
        backSpeed: 50,
        backDelay: 1200,
        loop: true,
        showCursor: false
    });

    // Mobile menu toggle
    const menuToggle = document.createElement('div');
    menuToggle.className = 'menu-toggle';
    menuToggle.innerHTML = '<i class="bx bx-menu"></i>';
    document.querySelector('.header').appendChild(menuToggle);

    const navbar = document.querySelector('.navbar');
    menuToggle.addEventListener('click', () => {
        navbar.classList.toggle('active');
        menuToggle.innerHTML = navbar.classList.contains('active') 
            ? '<i class="bx bx-x"></i>' 
            : '<i class="bx bx-menu"></i>';
    });

    // Close menu when clicking a link
    document.querySelectorAll('.navbar a').forEach(link => {
        link.addEventListener('click', () => {
            navbar.classList.remove('active');
            menuToggle.innerHTML = '<i class="bx bx-menu"></i>';
        });
    });

    // Back to top button
    const backToTop = document.querySelector('.back-to-top');
    window.addEventListener('scroll', () => {
        backToTop.classList.toggle('active', window.scrollY > 300);
    });

    backToTop.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Animation functions
    function animateElements(selector) {
        const elements = document.querySelectorAll(selector);
        
        function checkVisibility() {
            elements.forEach(element => {
                const rect = element.getBoundingClientRect();
                if (rect.top < window.innerHeight - 100) {
                    element.style.opacity = '1';
                    element.style.transform = 'translateY(0)';
                }
            });
        }

        // Initialize
        elements.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(20px)';
            element.style.transition = 'all 0.5s ease';
        });

        window.addEventListener('load', checkVisibility);
        window.addEventListener('scroll', checkVisibility);
    }

    // Animate all sections
    animateElements('.skill-card');
    animateElements('.service-card');
    animateElements('.contact-info li');
    animateElements('.social-links a');
    animateElements('.row');

    
});
    
