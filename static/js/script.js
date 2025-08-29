// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

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

// Observe all cards and sections
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.feature-card, .sensitive-item, .quote-card, .love-card');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Parallax effect for floating hearts
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hearts = document.querySelectorAll('.floating-hearts i');
    
    hearts.forEach((heart, index) => {
        const speed = 0.5 + (index * 0.1);
        heart.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Dynamic heart creation
function createFloatingHeart() {
    const heart = document.createElement('i');
    heart.className = 'fas fa-heart floating-heart';
    heart.style.position = 'fixed';
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.top = '100vh';
    heart.style.color = `hsl(${320 + Math.random() * 40}, 70%, 60%)`;
    heart.style.fontSize = (Math.random() * 1 + 0.5) + 'rem';
    heart.style.pointerEvents = 'none';
    heart.style.zIndex = '1000';
    heart.style.opacity = '0.7';
    
    document.body.appendChild(heart);
    
    // Animate the heart
    const animation = heart.animate([
        { transform: 'translateY(0) rotate(0deg)', opacity: 0.7 },
        { transform: 'translateY(-100vh) rotate(360deg)', opacity: 0 }
    ], {
        duration: 3000 + Math.random() * 2000,
        easing: 'ease-out'
    });
    
    animation.onfinish = () => heart.remove();
}

// Create floating hearts periodically
setInterval(createFloatingHeart, 3000);

// Add sparkle effect on hover for cards
document.querySelectorAll('.feature-card, .love-card, .quote-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        createSparkles(this);
    });
});

function createSparkles(element) {
    for (let i = 0; i < 5; i++) {
        setTimeout(() => {
            const sparkle = document.createElement('div');
            sparkle.innerHTML = '✨';
            sparkle.style.position = 'absolute';
            sparkle.style.left = Math.random() * element.offsetWidth + 'px';
            sparkle.style.top = Math.random() * element.offsetHeight + 'px';
            sparkle.style.pointerEvents = 'none';
            sparkle.style.fontSize = '1rem';
            sparkle.style.zIndex = '10';
            
            element.style.position = 'relative';
            element.appendChild(sparkle);
            
            const sparkleAnimation = sparkle.animate([
                { transform: 'scale(0) rotate(0deg)', opacity: 1 },
                { transform: 'scale(1.5) rotate(180deg)', opacity: 0 }
            ], {
                duration: 1000,
                easing: 'ease-out'
            });
            
            sparkleAnimation.onfinish = () => sparkle.remove();
        }, i * 100);
    }
}

// Add typing effect to hero subtitle
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing effect when page loads
window.addEventListener('load', () => {
    const subtitle = document.querySelector('.hero-subtitle');
    if (subtitle) {
        const originalText = subtitle.textContent;
        typeWriter(subtitle, originalText, 80);
    }
    
    // Add music player interaction hint
    setTimeout(() => {
        const musicPlayer = document.querySelector('.music-player');
        if (musicPlayer) {
            musicPlayer.style.animation = 'musicPulse 1s ease-in-out 3';
        }
    }, 3000);
});