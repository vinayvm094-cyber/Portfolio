/* ----------------------------------------------------
   PREMIUM PORTFOLIO INTERACTION ENGINE - VINAY V.M
   Handles particles, magnetic effects, typing, 3D tilt,
   custom cursor and interactive reveals.
   ---------------------------------------------------- */

document.addEventListener('DOMContentLoaded', () => {

    // 1. --- CUSTOM GLOWING CURSOR ---
    const cursorGlow = document.getElementById('cursorGlow');
    const cursorDot = document.getElementById('cursorDot');

    let mouseX = 0, mouseY = 0;
    let glowX = 0, glowY = 0;
    let dotX = 0, dotY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function updateCursor() {
        // Slow lag interpolation for smooth glow follow
        glowX += (mouseX - glowX) * 0.08;
        glowY += (mouseY - glowY) * 0.08;
        cursorGlow.style.left = `${glowX}px`;
        cursorGlow.style.top = `${glowY}px`;

        // Faster lag interpolation for dot
        dotX += (mouseX - dotX) * 0.25;
        dotY += (mouseY - dotY) * 0.25;
        cursorDot.style.left = `${dotX}px`;
        cursorDot.style.top = `${dotY}px`;

        requestAnimationFrame(updateCursor);
    }
    requestAnimationFrame(updateCursor);


    // 2. --- FLOATING CANVAS PARTICLES ---
    const canvas = document.getElementById('particle-canvas');
    const ctx = canvas.getContext('2d');

    let particles = [];
    const particleCount = 45;

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    class Particle {
        constructor() {
            this.reset();
        }

        reset() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 0.5;
            this.speedX = Math.random() * 0.4 - 0.2;
            this.speedY = Math.random() * 0.4 - 0.2;
            this.alpha = Math.random() * 0.5 + 0.1;
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
                this.reset();
            }
        }

        draw() {
            ctx.save();
            ctx.globalAlpha = this.alpha;
            ctx.fillStyle = '#00f3ff';
            ctx.shadowBlur = 8;
            ctx.shadowColor = '#00f3ff';
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        }
    }

    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }

    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach(p => {
            p.update();
            p.draw();
        });

        requestAnimationFrame(animateParticles);
    }
    requestAnimationFrame(animateParticles);


    // 3. --- HEADER SCROLL ACTION ---
    const header = document.getElementById('main-header');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });


    // 4. --- MOBILE MENU TOGGLE ---
    const menuBtn = document.getElementById('menu-btn');
    const mobileOverlay = document.getElementById('mobile-overlay');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    menuBtn.addEventListener('click', () => {
        menuBtn.classList.toggle('active');
        mobileOverlay.classList.toggle('active');

        // Prevent background scrolling when mobile nav is open
        if (mobileOverlay.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    });

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            menuBtn.classList.remove('active');
            mobileOverlay.classList.remove('active');
            document.body.style.overflow = '';
        });
    });


    // 5. --- TYPING TEXT ANIMATION ---
    const words = [
        "Software Development",
        "Hardware & IT Support Systems",
        "Desktop Support & Configurations"
    ];
    let wordIdx = 0;
    let charIdx = 0;
    let isDeleting = false;
    const typingSpan = document.getElementById('typing-text');
    let typingSpeed = 100;

    function typeEffect() {
        const currentWord = words[wordIdx];

        if (isDeleting) {
            typingSpan.textContent = currentWord.substring(0, charIdx - 1);
            charIdx--;
            typingSpeed = 50;
        } else {
            typingSpan.textContent = currentWord.substring(0, charIdx + 1);
            charIdx++;
            typingSpeed = 100;
        }

        if (!isDeleting && charIdx === currentWord.length) {
            // Pause at complete word
            typingSpeed = 1800;
            isDeleting = true;
        } else if (isDeleting && charIdx === 0) {
            isDeleting = false;
            wordIdx = (wordIdx + 1) % words.length;
            typingSpeed = 500;
        }

        setTimeout(typeEffect, typingSpeed);
    }
    setTimeout(typeEffect, 1000);


    // 6. --- 3D CARD HOVER TILT EFFECT ---
    const tiltCards = document.querySelectorAll('[data-tilt]');

    tiltCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left; // x coordinate within client
            const y = e.clientY - rect.top;  // y coordinate within client

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            // Rotation parameters (-10 to 10 deg)
            const rotateX = ((centerY - y) / centerY) * 8;
            const rotateY = ((x - centerX) / centerX) * 8;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
        });
    });


    // 7. --- MAGNETIC CTA BUTTONS ---
    const magneticBtns = document.querySelectorAll('.btn-magnetic');

    magneticBtns.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            // Pull element slightly (max 12px)
            const pullX = (x - centerX) * 0.35;
            const pullY = (y - centerY) * 0.35;

            btn.style.transform = `translate(${pullX}px, ${pullY}px)`;

            // If button has nested span or icon, slide them even more for parallax depth
            const textSpan = btn.querySelector('span');
            const icon = btn.querySelector('i');
            if (textSpan) textSpan.style.transform = `translate(${pullX * 0.15}px, ${pullY * 0.15}px)`;
            if (icon) icon.style.transform = `translate(${pullX * 0.25}px, ${pullY * 0.25}px)`;
        });

        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translate(0px, 0px)';
            const textSpan = btn.querySelector('span');
            const icon = btn.querySelector('i');
            if (textSpan) textSpan.style.transform = 'translate(0px, 0px)';
            if (icon) icon.style.transform = 'translate(0px, 0px)';
        });
    });


    // 8. --- SCROLL REVEAL (INTERSECTION OBSERVER) ---
    const revealItems = document.querySelectorAll('.reveal-item');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
            }
        });
    }, {
        threshold: 0.12,
        rootMargin: '0px 0px -50px 0px'
    });

    revealItems.forEach(item => {
        revealObserver.observe(item);
    });

    // Handle Active Navigation Link tracking on scroll
    window.addEventListener('scroll', () => {
        let currentSectionId = '';

        sections.forEach(sec => {
            const secTop = sec.offsetTop;
            const secHeight = sec.clientHeight;

            if (window.scrollY >= (secTop - 200)) {
                currentSectionId = sec.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    });


    // 9. --- PORTFOLIO CONTACT FORM INTEGRATION ---
    const contactForm = document.getElementById('portfolio-contact-form');
    const formFeedback = document.getElementById('form-feedback');
    const submitBtn = document.getElementById('submit-btn');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Check form validity
            const name = document.getElementById('form-name').value.trim();
            const email = document.getElementById('form-email').value.trim();
            const subject = document.getElementById('form-subject').value.trim();
            const message = document.getElementById('form-message').value.trim();

            if (!name || !email || !subject || !message) {
                showFeedback("Please fill out all fields before submitting.", "error");
                return;
            }

            // Visual submitting state
            submitBtn.disabled = true;
            const originalBtnHtml = submitBtn.innerHTML;
            submitBtn.innerHTML = `<span>Sending...</span> <i class="fa-solid fa-spinner fa-spin"></i>`;

            // Simulate API round-trip delay
            setTimeout(() => {
                showFeedback(`Thank you, ${name}! Your message has been sent successfully. Routing copy to vinayvm094@gmail.com.`, "success");
                contactForm.reset();
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnHtml;

                // Clear success notification after 8 seconds
                setTimeout(() => {
                    formFeedback.textContent = "";
                    formFeedback.className = "feedback-msg";
                }, 8000);
            }, 1800);
        });
    }

    function showFeedback(text, type) {
        formFeedback.textContent = text;
        formFeedback.className = `feedback-msg ${type}`;
    }


    // 10. --- STAGING INTERACTIVE DEMO MODAL ---
    const modal = document.getElementById('demo-modal');
    const modalClose = document.getElementById('modal-close');
    const modalOk = document.getElementById('modal-ok');
    const demoTriggers = document.querySelectorAll('.demo-trigger');

    demoTriggers.forEach(trigger => {
        trigger.addEventListener('click', (e) => {
            e.preventDefault();
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    const closeModal = () => {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    };

    if (modalClose) modalClose.addEventListener('click', closeModal);
    if (modalOk) modalOk.addEventListener('click', closeModal);

    // Close modal by clicking backdrop
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

});
