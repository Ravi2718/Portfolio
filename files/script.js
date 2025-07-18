document.addEventListener('DOMContentLoaded', function() {
    // Loading screen
    const loadingScreen = document.getElementById('loading-screen');
    
    // Hide loading screen after page loads
    window.addEventListener('load', function() {
        setTimeout(() => {
            loadingScreen.classList.add('hidden');
            // Remove loading screen from DOM after animation
            setTimeout(() => {
                loadingScreen.remove();
            }, 500);
        }, 1000);
    });

    // Typed.js initialization
    var typed = new Typed(".text", {
        strings: ["Cybersecurity Researcher", "Ethical Hacker", "Software Developer", "Tech Enthusiast"],
        typeSpeed: 100,
        backSpeed: 50,
        backDelay: 1500,
        loop: true,
        showCursor: true,
        cursorChar: '|'
    });

    // Header scroll effect
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        header.classList.toggle('scrolled', window.scrollY > 100);
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

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Active navigation highlighting
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.navbar a');

    function updateActiveNav() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', updateActiveNav);

    // Back to top button
    const backToTop = document.querySelector('.back-to-top');
    window.addEventListener('scroll', () => {
        backToTop.classList.toggle('active', window.scrollY > 300);
    });

    backToTop.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Skill bar animations
    function animateSkillBars() {
        const skillBars = document.querySelectorAll('.skill-progress');
        
        skillBars.forEach(bar => {
            const targetWidth = bar.getAttribute('data-width');
            const rect = bar.getBoundingClientRect();
            
            if (rect.top < window.innerHeight - 100) {
                setTimeout(() => {
                    bar.style.width = targetWidth;
                }, 500);
            }
        });
    }

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // Animate skill bars when skills section is visible
                if (entry.target.closest('#skills')) {
                    animateSkillBars();
                }
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.skill-card, .service-card, .contact-info li, .social-links a, .row, .stat');
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'all 0.6s ease';
        observer.observe(element);
    });

    // Contact form handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(contactForm);
            const name = formData.get('name');
            const email = formData.get('email');
            const subject = formData.get('subject');
            const message = formData.get('message');
            
            // Basic validation
            if (!name || !email || !subject || !message) {
                showNotification('Please fill in all fields.', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showNotification('Please enter a valid email address.', 'error');
                return;
            }
            
            // Show loading state
            const submitBtn = contactForm.querySelector('.submit-btn');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="bx bx-loader-alt bx-spin"></i> Sending...';
            submitBtn.disabled = true;
            
            // Simulate form submission (replace with actual form handling)
            setTimeout(() => {
                // Create mailto link as fallback
                const mailtoLink = `mailto:ravigeetha915@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;
                window.location.href = mailtoLink;
                
                // Reset form
                contactForm.reset();
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                
                showNotification('Thank you for your message! Your email client will open to send the message.', 'success');
            }, 1500);
        });
    }

    // Utility functions
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <i class="bx ${type === 'success' ? 'bx-check-circle' : type === 'error' ? 'bx-error-circle' : 'bx-info-circle'}"></i>
            <span>${message}</span>
            <button class="notification-close"><i class="bx bx-x"></i></button>
        `;
        
        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3'};
            color: white;
            padding: 15px 20px;
            border-radius: 10px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
            z-index: 10000;
            display: flex;
            align-items: center;
            gap: 10px;
            max-width: 400px;
            transform: translateX(100%);
            transition: transform 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            removeNotification(notification);
        }, 5000);
        
        // Close button functionality
        notification.querySelector('.notification-close').addEventListener('click', () => {
            removeNotification(notification);
        });
    }

    function removeNotification(notification) {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }

    // Parallax effect for home section
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const homeSection = document.querySelector('.home');
        const homeContent = document.querySelector('.home-content');
        
        if (homeSection && homeContent) {
            const rate = scrolled * -0.5;
            homeContent.style.transform = `translateY(${rate}px)`;
        }
    });

    // Add hover effects to project cards
    const projectCards = document.querySelectorAll('.row');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Lazy loading for images
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));

    // Add loading animation to buttons
    const buttons = document.querySelectorAll('.btn-box, .abtbtn-box');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Create ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s ease-out;
                pointer-events: none;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Add ripple animation keyframes
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        
        .notification {
            font-family: 'Poppins', sans-serif;
            font-size: 14px;
        }
        
        .notification-close {
            background: none;
            border: none;
            color: white;
            cursor: pointer;
            padding: 0;
            margin-left: 10px;
        }
        
        .notification-close:hover {
            opacity: 0.8;
        }
    `;
    document.head.appendChild(style);

    console.log('Portfolio loaded successfully! 🚀');
});
    
