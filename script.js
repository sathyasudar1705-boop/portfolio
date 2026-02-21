
// Gallery Toggle
function toggleGallery() {
    const wrapper = document.getElementById('galleryWrapper');
    const btn = document.getElementById('galleryToggle');
    const textEl = btn.querySelector('.toggle-text');

    if (wrapper.style.display === 'none') {
        wrapper.style.display = 'block';
        btn.classList.add('active');
        textEl.textContent = 'Hide My Shots';
        // Re-init lucide icons for eye-off
        if (typeof lucide !== 'undefined') lucide.createIcons();
    } else {
        wrapper.style.display = 'none';
        btn.classList.remove('active');
        textEl.textContent = 'View My Shots';
    }
}

// Professional Scroll Reveal System
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
};

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('reveal-visible');
            revealObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

const initReveals = () => {
    document.querySelectorAll('.stagger-container').forEach(container => {
        const children = container.querySelectorAll('.reveal');
        children.forEach((child, index) => {
            child.style.setProperty('--stagger-index', index + 1);
        });
    });

    document.querySelectorAll('.reveal').forEach(el => {
        revealObserver.observe(el);
    });
};

document.addEventListener('DOMContentLoaded', initReveals);
if (document.readyState === 'complete' || document.readyState === 'interactive') {
    initReveals();
}

// Advanced Magnetic Effect
const magneticElements = document.querySelectorAll('.btn, .nav-links a, .logo, .skill-card');

magneticElements.forEach(el => {
    el.addEventListener('mousemove', (e) => {
        const rect = el.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const deltaX = (e.clientX - centerX) * 0.3;
        const deltaY = (e.clientY - centerY) * 0.3;

        el.style.transform = `translate(${deltaX}px, ${deltaY}px)`;

        // Add subtle tilt for skill cards
        if (el.classList.contains('skill-card')) {
            const rotateX = (e.clientY - centerY) / 20;
            const rotateY = (centerX - e.clientX) / 20;
            el.style.transform += ` perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
        }
    });

    el.addEventListener('mouseleave', () => {
        el.style.transform = 'translate(0, 0) rotateX(0deg) rotateY(0deg) scale(1)';
    });
});

// Subtle Parallax on Scroll
window.addEventListener('scroll', () => {
    const scroll = window.pageYOffset;

    // Hero Parallax
    const heroImage = document.querySelector('.hero-image');
    if (heroImage) {
        heroImage.style.transform = `translateY(${scroll * 0.2}px)`;
    }

    const blob = document.querySelector('.blob');
    if (blob) {
        blob.style.transform = `translate(${Math.sin(scroll * 0.002) * 20}px, ${Math.cos(scroll * 0.002) * 20}px)`;
    }

    // Navbar state
    const nav = document.querySelector('.top-nav');
    if (nav) {
        if (scroll > 20) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    }
});

// Form Submission (Smart Contact System)
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const btn = contactForm.querySelector('button');
        const span = btn.querySelector('span');
        const originalText = span.textContent;
        const formData = new FormData(contactForm);

        const targetEmail = 'sathyasudar.vasagam@fssa.freshworks.com';

        // Show loading state
        span.textContent = 'Sending...';
        btn.style.opacity = '0.7';
        btn.disabled = true;

        try {
            // Try automatic sending via Formspree
            const response = await fetch(contactForm.action, {
                method: contactForm.method,
                body: formData,
                headers: { 'Accept': 'application/json' }
            });

            if (response.ok) {
                span.textContent = 'Message Sent!';
                btn.style.background = '#10b981';
                contactForm.reset();
                if (typeof lucide !== 'undefined') lucide.createIcons();
            } else {
                throw new Error('Service not active');
            }
        } catch (error) {
            console.error('Submission Error:', error);

            // FAILOVER: mailto logic
            const name = formData.get('name') || 'Someone';
            const email = formData.get('email') || 'No email';
            const msg = formData.get('message') || '';

            const subject = encodeURIComponent(`New Portfolio Message from ${name}`);
            const body = encodeURIComponent(`From: ${name} (${email})\n\nMessage:\n${msg}`);
            const mailtoUrl = `mailto:${targetEmail}?subject=${subject}&body=${body}`;

            // Helpful alert for the user
            alert(`Opening your email app to send the message to: ${targetEmail}\n\nJust click 'Send' in your mail app!`);
            window.location.href = mailtoUrl;

            span.textContent = 'Sent via Email App';
            btn.style.background = '#4f46e5';

            // Secondary Fallback: Show the link manually if the app doesn't open
            const fallbackLink = document.createElement('p');
            fallbackLink.innerHTML = `If your email app didn't open, <a href="${mailtoUrl}" style="color:var(--primary); font-weight:bold; text-decoration:underline;">click here to send the email</a>.`;
            fallbackLink.style.fontSize = '0.9rem';
            fallbackLink.style.marginTop = '1rem';
            fallbackLink.style.textAlign = 'center';
            fallbackLink.classList.add('reveal', 'reveal-visible');

            if (!contactForm.parentElement.querySelector('a[href^="mailto:"]')) {
                contactForm.parentElement.appendChild(fallbackLink);
            }
        }

        setTimeout(() => {
            span.textContent = originalText;
            btn.style.background = '';
            btn.style.opacity = '1';
            btn.disabled = false;
            if (typeof lucide !== 'undefined') lucide.createIcons();
        }, 5000);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    if (typeof lucide !== 'undefined') lucide.createIcons();
});

// --- Professional Project Showcase JS ---

// Project Data for Modal
const projectData = {
    'Aquarium': {
        title: 'The Aqua Shop',
        desc: 'A premium, high-conversion landing page for fish enthusiasts.',
        longDesc: 'Built with a focus on performance and clean UI/UX, this project involved creating a custom responsive grid system and interactive product displays.',
        tech: ['HTML5', 'CSS3', 'JavaScript', 'Responsive Design'],
        link: 'https://sathyasudar1705-boop.github.io/Aquarium/',
        img: 'assets/Aquarium.png'
    },
    'Origin X': {
        title: 'Origin X',
        desc: 'The ultimate bridge between high-stakes employers and top talent.',
        longDesc: 'A massive full-stack undertaking implementing complex backend APIs with FastAPI, real-time database management with PostgreSQL, and a buttery-smooth frontend experience.',
        tech: ['Python', 'FastAPI', 'PostgreSQL', 'JavaScript', 'Tailwind CSS'],
        link: 'https://origin-frontend-exs53360d-sathya-sudars-projects.vercel.app',
        img: 'assets/origin x.png'
    }
};

// Filtering Logic
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

if (filterButtons.length > 0) {
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Active Button state
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                if (filterValue === 'all' || filterValue === category) {
                    card.classList.remove('hide');
                    card.classList.add('show');
                } else {
                    card.classList.remove('show');
                    card.classList.add('hide');
                }
            });
        });
    });
}

// Modal Logic
const modal = document.getElementById('project-modal');
if (modal) {
    const modalBody = modal.querySelector('.modal-body');
    const modalClose = modal.querySelector('.modal-close');
    const modalBackdrop = modal.querySelector('.modal-backdrop');

    const openModal = (projKey) => {
        const data = projectData[projKey];
        if (!data) return;

        modalBody.innerHTML = `
            <div class="modal-left">
                <img src="${data.img}" alt="${data.title}" style="width:100%; border-radius:16px; box-shadow: 0 10px 30px rgba(0,0,0,0.5);">
            </div>
            <div class="modal-right">
                <h2 style="font-family:'Outfit'; font-size:2.5rem; margin-bottom:1rem; background: var(--gradient); -webkit-background-clip:text; background-clip:text; -webkit-text-fill-color:transparent;">${data.title}</h2>
                <p style="color: var(--secondary); font-weight:600; margin-bottom:1.5rem;">${data.desc}</p>
                <p style="color: var(--text-muted); line-height:1.8; margin-bottom:2rem;">${data.longDesc}</p>
                <div class="proj-tech" style="margin-bottom:2.5rem;">
                    ${data.tech.map(t => `<span>${t}</span>`).join('')}
                </div>
                <a href="${data.link}" target="_blank" class="btn primary" style="text-align:center;">Launch Project <i data-lucide="external-link" style="width:18px; margin-left:8px;"></i></a>
            </div>
        `;

        lucide.createIcons();
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    };

    const closeModal = () => {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    };

    projectCards.forEach(card => {
        const exploreBtn = card.querySelector('.view-link');
        const titleEl = card.querySelector('h3');
        if (exploreBtn && titleEl) {
            const title = titleEl.textContent;
            exploreBtn.addEventListener('click', (e) => {
                e.preventDefault();
                openModal(title);
            });
        }
    });

    if (modalClose) modalClose.addEventListener('click', closeModal);
    if (modalBackdrop) modalBackdrop.addEventListener('click', closeModal);

    // Handle ESC key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeModal();
    });
}
