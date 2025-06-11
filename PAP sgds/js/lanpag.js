// Interactive animations
function animateButton(button) {
    button.style.transform = 'scale(0.95)';
    setTimeout(() => {
        button.style.transform = 'scale(1)';
    }, 150);
}

function addHoverEffect(img) {
    img.style.filter = 'brightness(1.1) saturate(1.2)';
    img.style.transform = 'scale(1.05)';
    img.style.transition = 'all 0.3s ease';
}

function removeHoverEffect(img) {
    img.style.filter = 'none';
    img.style.transform = 'scale(1)';
}

function expandFeature(feature) {
    feature.style.transform = 'scale(1.02)';
    feature.style.boxShadow = '0 25px 50px rgba(74, 124, 89, 0.15)';
    feature.style.transition = 'all 0.3s ease';
    setTimeout(() => {
        feature.style.transform = 'scale(1)';
        feature.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';
    }, 300);
}

function animateCounter(statItem) {
    const numberEl = statItem.querySelector('.stat-number');
    const target = parseInt(numberEl.dataset.target);
    let current = 0;
    const increment = target / 50;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        numberEl.textContent = Math.floor(current);
    }, 30);
}

function expandUpdate(update) {
    update.style.transform = 'scale(1.02)';
    update.style.transition = 'all 0.3s ease';
    setTimeout(() => {
        update.style.transform = 'scale(1)';
    }, 300);
}

function highlightCard(card) {
    const originalBackground = card.style.background || getComputedStyle(card).background;
    const originalColor = card.style.color || getComputedStyle(card).color;
    
    card.style.background = 'linear-gradient(135deg, #a8d5ba 0%, #7fb069 100%)';
    card.style.color = 'white';
    card.style.transition = 'all 0.3s ease';
    
    setTimeout(() => {
        card.style.background = originalBackground;
        card.style.color = originalColor;
    }, 1000);
}

// Smooth scrolling for navigation
document.addEventListener('DOMContentLoaded', () => {
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
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 30px rgba(0,0,0,0.15)';
            navbar.style.transition = 'all 0.3s ease';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
        }
    }
});

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '0';
            entry.target.style.transform = 'translateY(30px)';
            entry.target.style.transition = 'all 0.8s ease-out';
            
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, 100);
        }
    });
}, observerOptions);

// Observe elements for scroll animations
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.feature-item, .update-card, .stat-item, .main-update').forEach(el => {
        observer.observe(el);
    });
});

// Auto-animate counters when in view
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statItems = entry.target.querySelectorAll('.stat-item');
            statItems.forEach((item, index) => {
                setTimeout(() => {
                    animateCounter(item);
                }, index * 200);
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

// Initialize stats observer when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    const statsSection = document.querySelector('.stats-grid');
    if (statsSection) {
        statsObserver.observe(statsSection);
    }
});

// Interactive cursor effect
document.addEventListener('DOMContentLoaded', () => {
    let cursor = document.createElement('div');
    cursor.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        background: rgba(74, 124, 89, 0.3);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        transition: transform 0.1s ease;
        display: none;
    `;
    document.body.appendChild(cursor);

    // Show cursor only on desktop
    if (window.innerWidth > 768) {
        cursor.style.display = 'block';
        
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX - 10 + 'px';
            cursor.style.top = e.clientY - 10 + 'px';
        });
    }
});

// Add click ripple effect
document.addEventListener('click', (e) => {
    const ripple = document.createElement('div');
    ripple.style.cssText = `
        position: fixed;
        border-radius: 50%;
        background: rgba(74, 124, 89, 0.3);
        pointer-events: none;
        transform: scale(0);
        animation: ripple 0.6s linear;
        left: ${e.clientX - 25}px;
        top: ${e.clientY - 25}px;
        width: 50px;
        height: 50px;
        z-index: 1000;
    `;
    
    // Add ripple animation keyframes
    if (!document.querySelector('#ripple-styles')) {
        const style = document.createElement('style');
        style.id = 'ripple-styles';
        style.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
});

// Page load animations
document.addEventListener('DOMContentLoaded', () => {
    // Add fade-in effect for page load
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease-in-out';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
    
    // Initialize interactive dots animation
    initializeInteractiveDots();
    
    // Initialize any additional interactive elements
    console.log('Eduverse Landing Page Loaded Successfully!');
});

// Interactive dots animation
function initializeInteractiveDots() {
    const dots = document.querySelectorAll('.interactive-dot');
    
    dots.forEach((dot, index) => {
        // Add floating animation
        dot.style.cssText = `
            position: absolute;
            width: 60px;
            height: 60px;
            background: linear-gradient(135deg, rgba(74, 124, 89, 0.2), rgba(127, 176, 105, 0.3));
            border-radius: 50%;
            animation: float ${3 + index * 0.5}s ease-in-out infinite;
            z-index: 1;
        `;
        
        // Position dots
        if (index === 0) {
            dot.style.top = '20%';
            dot.style.left = '10%';
        } else if (index === 1) {
            dot.style.top = '60%';
            dot.style.right = '15%';
        } else if (index === 2) {
            dot.style.bottom = '20%';
            dot.style.left = '20%';
        }
    });
    
    // Add floating animation keyframes
    if (!document.querySelector('#floating-styles')) {
        const style = document.createElement('style');
        style.id = 'floating-styles';
        style.textContent = `
            @keyframes float {
                0%, 100% { transform: translateY(0px) rotate(0deg); }
                50% { transform: translateY(-20px) rotate(5deg); }
            }
        `;
        document.head.appendChild(style);
    }
}

// Mobile menu toggle (if needed)
function toggleMobileMenu() {
    const navLinks = document.querySelector('.nav-links');
    if (navLinks) {
        navLinks.classList.toggle('active');
    }
}

// Keyboard navigation support
document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
        const focusedElement = document.activeElement;
        
        // Handle button-like elements
        if (focusedElement.classList.contains('cta-button')) {
            e.preventDefault();
            animateButton(focusedElement);
        }
        
        // Handle feature items
        if (focusedElement.classList.contains('feature-item')) {
            e.preventDefault();
            expandFeature(focusedElement);
        }
        
        // Handle update cards
        if (focusedElement.classList.contains('update-card')) {
            e.preventDefault();
            highlightCard(focusedElement);
        }
        
        // Handle main update
        if (focusedElement.classList.contains('main-update')) {
            e.preventDefault();
            expandUpdate(focusedElement);
        }
    }
    
    // ESC key to close mobile menu
    if (e.key === 'Escape') {
        const navLinks = document.querySelector('.nav-links');
        if (navLinks && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
        }
    }
});

// Add focus styles for accessibility
document.addEventListener('DOMContentLoaded', () => {
    const style = document.createElement('style');
    style.textContent = `
        .cta-button:focus,
        .feature-item:focus,
        .update-card:focus,
        .main-update:focus {
            outline: 2px solid #4a7c59;
            outline-offset: 2px;
        }
        
        .nav-links a:focus {
            outline: 2px solid #4a7c59;
            outline-offset: 4px;
            border-radius: 4px;
        }
    `;
    document.head.appendChild(style);
    
    // Make interactive elements focusable
    document.querySelectorAll('.feature-item, .update-card, .main-update').forEach(el => {
        el.setAttribute('tabindex', '0');
    });
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const heroImage = document.querySelector('.hero-image img');
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.5;
    
    if (heroImage) {
        heroImage.style.transform = `translateY(${rate}px)`;
    }
});

// Performance optimization: Throttle scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Apply throttling to scroll events
window.addEventListener('scroll', throttle(() => {
    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 30px rgba(0,0,0,0.15)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
        }
    }
    
    // Parallax effect
    const heroImage = document.querySelector('.hero-image img');
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.2;
    
    if (heroImage) {
        heroImage.style.transform = `translateY(${rate}px)`;
    }
}, 16)); // ~60fps