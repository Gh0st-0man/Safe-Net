// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Close mobile menu if open
            navLinks.classList.remove('active');
        }
    });
});

// Navbar Background on Scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(10, 10, 10, 0.95)';
    } else {
        navbar.style.background = 'rgba(10, 10, 10, 0.9)';
    }
});

// Contact Form Handling
document.querySelector('.contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(this);
    const formEntries = Object.fromEntries(formData);
    
    // Simple form validation
    if (!formEntries.name || !formEntries.email || !formEntries.message) {
        alert('Please fill in all required fields.');
        return;
    }
    
    // Simulate form submission
    const submitBtn = this.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    
    setTimeout(() => {
        alert('Thank you for your message! We will get back to you soon.');
        this.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }, 2000);
});

// Add dynamic circuit lines
function addCircuitLine() {
    const bg = document.querySelector('.animated-bg');
    const line = document.createElement('div');
    line.className = 'circuit-line';
    
    const isHorizontal = Math.random() > 0.5;
    const size = Math.random() * 100 + 50;
    
    if (isHorizontal) {
        line.style.width = size + 'px';
        line.style.height = '2px';
        line.style.top = Math.random() * 100 + '%';
        line.style.left = Math.random() * 100 + '%';
    } else {
        line.style.width = '2px';
        line.style.height = size + 'px';
        line.style.top = Math.random() * 100 + '%';
        line.style.left = Math.random() * 100 + '%';
    }
    
    line.style.animationDelay = Math.random() * 4 + 's';
    bg.appendChild(line);
    
    // Remove line after animation
    setTimeout(() => {
        if (line.parentNode) {
            line.parentNode.removeChild(line);
        }
    }, 8000);
}

// Add new circuit lines periodically
setInterval(addCircuitLine, 3000);

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
        }
    });
}, observerOptions);

// Observe service cards for scroll animations
document.addEventListener('DOMContentLoaded', () => {
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        card.style.transitionDelay = (index * 0.1) + 's';
        observer.observe(card);
    });
});
