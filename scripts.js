document.addEventListener('DOMContentLoaded', () => {
    // Loader
    const loader = document.querySelector('.loader');
    window.addEventListener('load', () => {
        setTimeout(() => {
            loader.style.display = 'none';
        }, 1000);
    });

    // Custom Cursor
    const cursor = document.querySelector('.cursor');
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = `${e.clientX}px`;
        cursor.style.top = `${e.clientY}px`;
    });

    // Navigation Toggle
    const navToggle = document.querySelector('.nav-toggle');
    const menuOverlay = document.querySelector('.menu-overlay');
    const menuLinks = document.querySelectorAll('.menu-links a');

    navToggle.addEventListener('click', () => {
        menuOverlay.classList.toggle('active');
        navToggle.classList.toggle('active');
    });

    menuLinks.forEach(link => {
        link.addEventListener('click', () => {
            menuOverlay.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });

    // Navigation Highlight
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.nav-menu a');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.3
    };

    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href').slice(1) === entry.target.id) {
                        link.classList.add('active');
                    }
                });
            }
        });
    };

    const sectionObserver = new IntersectionObserver(observerCallback, observerOptions);
    sections.forEach(section => sectionObserver.observe(section));

    // Typing Effect for About Section
    const typingText = document.querySelector('#about .about-text p:first-child');
    const originalText = typingText.textContent;
    typingText.textContent = '';

    function typeWriter(text, element, index = 0) {
        if (index < text.length) {
            element.textContent += text.charAt(index);
            setTimeout(() => typeWriter(text, element, index + 1), 30);
        }
    }

    // Start typing after a short delay
    setTimeout(() => {
        typeWriter(originalText, typingText);
    }, 1000);

    // Project Hover Effects
    const projectItems = document.querySelectorAll('.project-item');
    
    projectItems.forEach(project => {
        project.addEventListener('mouseenter', () => {
            project.classList.add('project-hover');
        });

        project.addEventListener('mouseleave', () => {
            project.classList.remove('project-hover');
        });
    });

    // Skills Interaction
    const skillsGrid = document.querySelector('.skills-grid');
    
    skillsGrid.addEventListener('mouseover', (e) => {
        if (e.target.tagName === 'SPAN') {
            e.target.classList.add('skill-highlight');
        }
    });

    skillsGrid.addEventListener('mouseout', (e) => {
        if (e.target.tagName === 'SPAN') {
            e.target.classList.remove('skill-highlight');
        }
    });

    // Contact Email Interaction
    const emailLink = document.querySelector('.email-link');
    
    emailLink.addEventListener('click', (e) => {
        e.preventDefault();
        navigator.clipboard.writeText('rahulsharma.dev@gmail.com').then(() => {
            emailLink.textContent = 'Email Copied!';
            setTimeout(() => {
                emailLink.textContent = 'Get In Touch';
            }, 2000);
        });
    });

    // Smooth Scrolling
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').slice(1);
            const targetSection = document.getElementById(targetId);
            
            targetSection.scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Scroll Reveal
    const revealElements = document.querySelectorAll('.mega-text, .project-item, .about-text');
    const observerOptionsReveal = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observerReveal = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptionsReveal);

    revealElements.forEach(el => observerReveal.observe(el));

    // Form Submission
    const contactForm = document.querySelector('.contact-form');
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        // Add form submission logic here
        alert('Message sent! We will get back to you soon.');
        contactForm.reset();
    });
});
