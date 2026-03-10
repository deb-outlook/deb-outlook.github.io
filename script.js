document.addEventListener('DOMContentLoaded', () => {
    
    // --- Mobile Menu Toggle ---
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (menuBtn) {
        menuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // --- Contact Form Validation ---
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const name = document.getElementById('name');
            const email = document.getElementById('email');
            const message = document.getElementById('message');
            let isValid = true;

            // Reset errors
            document.querySelectorAll('.error-msg').forEach(el => el.style.display = 'none');
            name.style.borderColor = '#ddd';
            email.style.borderColor = '#ddd';
            message.style.borderColor = '#ddd';

            // Validate Name
            if (name.value.trim() === '') {
                showError(name, 'Name is required');
                isValid = false;
            }

            // Validate Email
            if (email.value.trim() === '') {
                showError(email, 'Email is required');
                isValid = false;
            } else if (!isValidEmail(email.value)) {
                showError(email, 'Please enter a valid email');
                isValid = false;
            }

            // Validate Message
            if (message.value.trim() === '') {
                showError(message, 'Message is required');
                isValid = false;
            }

            if (isValid) {
                // Simulate submission
                const btn = contactForm.querySelector('button');
                const originalText = btn.innerText;
                btn.innerText = 'Sending...';
                btn.disabled = true;

                setTimeout(() => {
                    alert('Thank you! Your message has been sent.');
                    contactForm.reset();
                    btn.innerText = originalText;
                    btn.disabled = false;
                }, 1500);
            }
        });
    }

    // Helper: Show Error
    function showError(input, message) {
        const errorDiv = input.parentElement.querySelector('.error-msg');
        if (errorDiv) {
            errorDiv.innerText = message;
            errorDiv.style.display = 'block';
            input.style.borderColor = '#ef4444';
        }
    }

    // Helper: Email Regex
    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    // --- Scroll Animation (Simple Fade In) ---
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Apply animation styles to cards and sections
    const animatedElements = document.querySelectorAll('.card, .about-section, .contact-form');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'all 0.6s ease-out';
        observer.observe(el);
    });
});