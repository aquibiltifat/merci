// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('nav ul');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            const icon = this.querySelector('i');
            if (navMenu.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }
    
    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                navMenu.classList.remove('active');
                const icon = mobileMenuBtn.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    });
    
    // Counter Animation
    function animateCounter(element) {
        const target = parseInt(element.getAttribute('data-count'));
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = target + '+';
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current) + '+';
            }
        }, 16);
    }
    
    // Intersection Observer for counters
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                animateCounter(entry.target);
                entry.target.classList.add('animated');
            }
        });
    }, { threshold: 0.5 });
    
    const counters = document.querySelectorAll('.counter h3[data-count]');
    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
    
    // Donation Modal functionality
    const modal = document.getElementById('donationModal');
    const donateButtons = document.querySelectorAll('.donate-btn');
    const closeModalBtns = document.querySelectorAll('.close-modal');
    
    donateButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            modal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        });
    });
    
    closeModalBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const parentModal = this.closest('.modal, .image-modal');
            if (parentModal) {
                parentModal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    });
    
    window.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal') || e.target.classList.contains('image-modal')) {
            e.target.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
    
    // Gallery Filter functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            galleryItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.classList.remove('hide');
                    item.style.display = 'block';
                } else {
                    item.classList.add('hide');
                    item.style.display = 'none';
                }
            });
        });
    });
    
    // Gallery Image Modal
    const imageModal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    const modalCaption = document.getElementById('modalCaption');
    
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            if (imageModal && modalImage) {
                const img = this.querySelector('img');
                const overlay = this.querySelector('.gallery-overlay');
                
                imageModal.style.display = 'block';
                modalImage.src = img.src;
                
                if (overlay && modalCaption) {
                    const title = overlay.querySelector('h3').textContent;
                    const description = overlay.querySelector('p').textContent;
                    modalCaption.textContent = title + ' - ' + description;
                }
            }
        });
    });
    
    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', function() {
            // Close all other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            item.classList.toggle('active');
        });
    });
    
    // Scholarship Form Validation
    const scholarshipForm = document.getElementById('scholarshipForm');
    
    if (scholarshipForm) {
        scholarshipForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const fullName = document.getElementById('fullName').value.trim();
            const email = document.getElementById('email').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const percentage = parseFloat(document.getElementById('percentage').value);
            const essay = document.getElementById('essay').value.trim();
            const terms = document.querySelector('input[name="terms"]').checked;
            
            // Validation
            let errors = [];
            
            if (fullName.length < 3) {
                errors.push('Full name must be at least 3 characters long');
            }
            
            if (!email.includes('@') || email.length < 6) {
                errors.push('Please enter a valid email address');
            }
            
            if (phone.length < 10) {
                errors.push('Please enter a valid 10-digit phone number');
            }
            
            if (percentage < 60 || percentage > 100) {
                errors.push('Percentage must be between 60 and 100');
            }
            
            const wordCount = essay.split(/\s+/).filter(word => word.length > 0).length;
            if (wordCount < 200) {
                errors.push('Essay must be at least 200 words (currently ' + wordCount + ' words)');
            }
            
            if (!terms) {
                errors.push('You must accept the terms and conditions');
            }
            
            if (errors.length > 0) {
                alert('Please fix the following errors:\n\n' + errors.join('\n'));
                return;
            }
            
            // If validation passes
            alert('Thank you for your application! We will review it and get back to you within 7-10 business days.');
            scholarshipForm.reset();
        });
    }
    
    // Contact Form Validation
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('contactName').value.trim();
            const email = document.getElementById('contactEmail').value.trim();
            const message = document.getElementById('contactMessage').value.trim();
            
            let errors = [];
            
            if (name.length < 3) {
                errors.push('Name must be at least 3 characters long');
            }
            
            if (!email.includes('@') || email.length < 6) {
                errors.push('Please enter a valid email address');
            }
            
            if (message.length < 20) {
                errors.push('Message must be at least 20 characters long');
            }
            
            if (errors.length > 0) {
                alert('Please fix the following errors:\n\n' + errors.join('\n'));
                return;
            }
            
            alert('Thank you for contacting us! We will respond to your message within 24-48 hours.');
            contactForm.reset();
        });
    }
    
    // Newsletter Form
    const newsletterForm = document.getElementById('newsletterForm');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value.trim();
            
            if (!email.includes('@') || email.length < 6) {
                alert('Please enter a valid email address');
                return;
            }
            
            alert('Thank you for subscribing to our newsletter!');
            emailInput.value = '';
        });
    }
    
    // Smooth scroll for anchor links (if any remain)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#' || href === '') return;
            
            e.preventDefault();
            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const headerOffset = 100;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Fade in animation on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                fadeObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    const fadeElements = document.querySelectorAll('.program-card, .value-card, .team-card, .gallery-item, .scholarship-card');
    fadeElements.forEach(el => {
        fadeObserver.observe(el);
    });
    
    // Header scroll effect
    let lastScroll = 0;
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
        } else {
            header.style.boxShadow = '0 4px 6px rgba(198, 147, 32, 0.2)';
        }
        
        lastScroll = currentScroll;
    });
});
