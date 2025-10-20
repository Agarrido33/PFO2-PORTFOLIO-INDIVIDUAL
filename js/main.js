// DOM Elements
const playPauseBtn = document.getElementById('playPauseBtn');
const volumeSlider = document.getElementById('volumeSlider');
const backgroundMusic = document.getElementById('backgroundMusic');
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const contactForm = document.getElementById('contactForm');

// Audio Management
class AudioManager {
    constructor() {
        this.isPlaying = false;
        this.volume = 0.5;
        this.init();
    }

    init() {
        // Set initial volume
        backgroundMusic.volume = this.volume;
        volumeSlider.value = this.volume * 100;

        // Event listeners
        playPauseBtn.addEventListener('click', () => this.togglePlayPause());
        volumeSlider.addEventListener('input', (e) => this.setVolume(e.target.value / 100));
        
        // Auto-play prevention
        backgroundMusic.addEventListener('canplaythrough', () => {
            console.log('Audio ready to play');
        });

        // Handle audio errors
        backgroundMusic.addEventListener('error', (e) => {
            console.log('Audio error:', e);
            this.showAudioError();
        });
    }

    togglePlayPause() {
        if (this.isPlaying) {
            this.pause();
        } else {
            this.play();
        }
    }

    async play() {
        try {
            await backgroundMusic.play();
            this.isPlaying = true;
            playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
            this.addPulseEffect();
        } catch (error) {
            console.log('Autoplay prevented:', error);
            this.showPlayButton();
        }
    }

    pause() {
        backgroundMusic.pause();
        this.isPlaying = false;
        playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
        this.removePulseEffect();
    }

    setVolume(value) {
        this.volume = value;
        backgroundMusic.volume = value;
        
        // Update volume icon
        const volumeIcon = document.querySelector('.volume-control i');
        if (value === 0) {
            volumeIcon.className = 'fas fa-volume-mute';
        } else if (value < 0.5) {
            volumeIcon.className = 'fas fa-volume-down';
        } else {
            volumeIcon.className = 'fas fa-volume-up';
        }
    }

    addPulseEffect() {
        playPauseBtn.style.animation = 'pulse 1s infinite';
    }

    removePulseEffect() {
        playPauseBtn.style.animation = 'none';
    }

    showPlayButton() {
        // Show a subtle hint that user can click to play
        playPauseBtn.style.transform = 'scale(1.2)';
        setTimeout(() => {
            playPauseBtn.style.transform = 'scale(1)';
        }, 200);
    }

    showAudioError() {
        // Hide audio controls if audio file is not available
        const audioControls = document.querySelector('.audio-controls');
        audioControls.style.display = 'none';
    }
}

// Navigation Management
class NavigationManager {
    constructor() {
        this.init();
    }

    init() {
        // Mobile menu toggle
        hamburger.addEventListener('click', () => this.toggleMobileMenu());
        
        // Close mobile menu when clicking on links
        navLinks.forEach(link => {
            link.addEventListener('click', () => this.closeMobileMenu());
        });

        // Smooth scrolling for navigation links
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                if (targetSection) {
                    targetSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Active link highlighting
        window.addEventListener('scroll', () => this.updateActiveLink());
    }

    toggleMobileMenu() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        // Animate hamburger
        const bars = hamburger.querySelectorAll('.bar');
        bars.forEach((bar, index) => {
            if (hamburger.classList.contains('active')) {
                if (index === 0) bar.style.transform = 'rotate(-45deg) translate(-5px, 6px)';
                if (index === 1) bar.style.opacity = '0';
                if (index === 2) bar.style.transform = 'rotate(45deg) translate(-5px, -6px)';
            } else {
                bar.style.transform = 'none';
                bar.style.opacity = '1';
            }
        });
    }

    closeMobileMenu() {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        
        const bars = hamburger.querySelectorAll('.bar');
        bars.forEach(bar => {
            bar.style.transform = 'none';
            bar.style.opacity = '1';
        });
    }

    updateActiveLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            const correspondingLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => link.classList.remove('active'));
                if (correspondingLink) {
                    correspondingLink.classList.add('active');
                }
            }
        });
    }
}

// Animation Manager
class AnimationManager {
    constructor() {
        this.init();
    }

    init() {
        // Intersection Observer for scroll animations
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        // Observe elements for animation
        this.observeElements();
        
        // Counter animation for stats
        this.initCounterAnimation();
        
        // Skill bar animation
        this.initSkillBars();
        
        // Parallax effect for hero shapes
        this.initParallaxEffect();
    }

    observeElements() {
        const elementsToAnimate = document.querySelectorAll(`
            .about-text,
            .about-image,
            .timeline-item,
            .skill-category,
            .contact-info,
            .contact-form
        `);
        
        elementsToAnimate.forEach(el => this.observer.observe(el));
    }

    initCounterAnimation() {
        const counters = document.querySelectorAll('.stat-number');
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateCounter(entry.target);
                    counterObserver.unobserve(entry.target);
                }
            });
        });

        counters.forEach(counter => counterObserver.observe(counter));
    }

    animateCounter(element) {
        const target = parseInt(element.getAttribute('data-target'));
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current);
        }, 16);
    }

    initSkillBars() {
        const skillBars = document.querySelectorAll('.skill-progress');
        const skillObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const width = entry.target.getAttribute('data-width');
                    entry.target.style.width = width + '%';
                    skillObserver.unobserve(entry.target);
                }
            });
        });

        skillBars.forEach(bar => skillObserver.observe(bar));
    }

    initParallaxEffect() {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const shapes = document.querySelectorAll('.shape');
            
            shapes.forEach((shape, index) => {
                const speed = 0.5 + (index * 0.1);
                const yPos = -(scrolled * speed);
                shape.style.transform = `translateY(${yPos}px)`;
            });
        });
    }
}

// Form Manager
class FormManager {
    constructor() {
        this.init();
    }

    init() {
        if (contactForm) {
            contactForm.addEventListener('submit', (e) => this.handleSubmit(e));
            
            // Add input animations
            const inputs = contactForm.querySelectorAll('input, textarea');
            inputs.forEach(input => {
                input.addEventListener('focus', () => this.addFocusEffect(input));
                input.addEventListener('blur', () => this.removeFocusEffect(input));
            });
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        
        // Show loading state
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
        submitBtn.disabled = true;
        
        // Simulate form submission (replace with actual endpoint)
        setTimeout(() => {
            this.showSuccessMessage();
            contactForm.reset();
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }, 2000);
    }

    addFocusEffect(input) {
        input.parentElement.classList.add('focused');
    }

    removeFocusEffect(input) {
        if (!input.value) {
            input.parentElement.classList.remove('focused');
        }
    }

    showSuccessMessage() {
        // Create success notification
        const notification = document.createElement('div');
        notification.className = 'success-notification';
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-check-circle"></i>
                <span>¡Mensaje enviado exitosamente!</span>
            </div>
        `;
        
        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #4CAF50;
            color: white;
            padding: 15px 20px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            z-index: 1000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }
}

// Scroll Effects Manager
class ScrollEffectsManager {
    constructor() {
        this.init();
    }

    init() {
        // Navbar background on scroll
        window.addEventListener('scroll', () => this.handleNavbarScroll());
        
        // Smooth reveal animations
        this.initRevealAnimations();
        
        // Progress indicator
        this.initProgressIndicator();
    }

    handleNavbarScroll() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    }

    initRevealAnimations() {
        const revealElements = document.querySelectorAll('.section-title, .section-subtitle');
        
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animation = 'fadeInUp 0.8s ease forwards';
                    revealObserver.unobserve(entry.target);
                }
            });
        });

        revealElements.forEach(el => revealObserver.observe(el));
    }

    initProgressIndicator() {
        // Create progress bar
        const progressBar = document.createElement('div');
        progressBar.className = 'scroll-progress';
        progressBar.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 0%;
            height: 3px;
            background: linear-gradient(90deg, #012e58, #3498db);
            z-index: 1000;
            transition: width 0.1s ease;
        `;
        document.body.appendChild(progressBar);

        // Update progress on scroll
        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset;
            const docHeight = document.body.scrollHeight - window.innerHeight;
            const scrollPercent = (scrollTop / docHeight) * 100;
            progressBar.style.width = scrollPercent + '%';
        });
    }
}

// Cursor Effects Manager
class CursorEffectsManager {
    constructor() {
        this.init();
    }

    init() {
        // Create custom cursor
        this.createCustomCursor();
        
        // Add hover effects to interactive elements
        this.addHoverEffects();
    }

    createCustomCursor() {
        const cursor = document.createElement('div');
        cursor.className = 'custom-cursor';
        cursor.style.cssText = `
            position: fixed;
            width: 20px;
            height: 20px;
            background: rgba(52, 152, 219, 0.8);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            transition: transform 0.1s ease;
            mix-blend-mode: difference;
        `;
        document.body.appendChild(cursor);

        // Follow mouse
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX - 10 + 'px';
            cursor.style.top = e.clientY - 10 + 'px';
        });

        // Scale on hover
        const interactiveElements = document.querySelectorAll('a, button, .btn, .skill-item, .contact-item');
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.style.transform = 'scale(2)';
            });
            el.addEventListener('mouseleave', () => {
                cursor.style.transform = 'scale(1)';
            });
        });
    }

    addHoverEffects() {
        // Add ripple effect to buttons
        const buttons = document.querySelectorAll('.btn');
        buttons.forEach(button => {
            button.addEventListener('click', (e) => this.createRipple(e, button));
        });
    }

    createRipple(event, element) {
        const ripple = document.createElement('span');
        const rect = element.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;

        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
        `;

        element.style.position = 'relative';
        element.style.overflow = 'hidden';
        element.appendChild(ripple);

        setTimeout(() => {
            ripple.remove();
        }, 600);
    }
}

// Performance Optimizer
class PerformanceOptimizer {
    constructor() {
        this.init();
    }

    init() {
        // Lazy load images
        this.lazyLoadImages();
        
        // Optimize scroll events
        this.throttleScrollEvents();
        
        // Preload critical resources
        this.preloadResources();
    }

    lazyLoadImages() {
        const images = document.querySelectorAll('img[data-src]');
        const imageObserver = new IntersectionObserver((entries) => {
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
    }

    throttleScrollEvents() {
        let ticking = false;
        
        const updateScrollEffects = () => {
            // All scroll-based effects go here
            ticking = false;
        };

        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(updateScrollEffects);
                ticking = true;
            }
        });
    }

    preloadResources() {
        // Preload critical CSS and fonts
        const criticalResources = [
            'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap',
            'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css'
        ];

        criticalResources.forEach(resource => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.as = 'style';
            link.href = resource;
            document.head.appendChild(link);
        });
    }
}

// Initialize all managers when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize all managers
    new AudioManager();
    new NavigationManager();
    new AnimationManager();
    new FormManager();
    new ScrollEffectsManager();
    new CursorEffectsManager();
    new PerformanceOptimizer();

    // Add CSS for animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        
        .nav-link.active {
            color: #3498db;
        }
        
        .nav-link.active::after {
            width: 100%;
        }
        
        .focused {
            transform: translateY(-2px);
        }
        
        .success-notification .notification-content {
            display: flex;
            align-items: center;
            gap: 10px;
        }
        
        .success-notification i {
            font-size: 20px;
        }
        
        @media (max-width: 768px) {
            .custom-cursor {
                display: none;
            }
        }
    `;
    document.head.appendChild(style);

    console.log('🚀 Portfolio loaded successfully!');
});

// Handle page visibility changes
document.addEventListener('visibilitychange', () => {
    const audioManager = window.audioManager;
    if (document.hidden && audioManager && audioManager.isPlaying) {
        audioManager.pause();
    }
});

// Export for potential external use
window.PortfolioApp = {
    AudioManager,
    NavigationManager,
    AnimationManager,
    FormManager,
    ScrollEffectsManager,
    CursorEffectsManager,
    PerformanceOptimizer
};
