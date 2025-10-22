// Supabase Configuration
const SUPABASE_URL = 'https://whmmacwjjwhcjowjsxnd.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndobW1hY3dqandoY2pvd2pzeG5kIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjEwNTk5OTgsImV4cCI6MjA3NjYzNTk5OH0.Kj1Nz6K_0OJaviyDj2oYAireCRI1bUKPFhHdgibhCoE';

// Initialize Supabase with error handling
let supabase;
try {
    if (window.supabase) {
        supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
        console.log('✅ Supabase initialized');
    } else {
        console.error('❌ Supabase library not loaded');
    }
} catch (error) {
    console.error('❌ Supabase initialization failed:', error);
}

// Test the connection
async function testSupabase() {
    if (!supabase) {
        console.error('❌ Supabase client not available');
        return;
    }
    
    try {
        const { data, error } = await supabase.from('scholarship_applications').select('*').limit(1);
        if (error) {
            console.error('❌ Supabase connection error:', error.message);
        } else {
            console.log('✅ Supabase connected successfully. Data:', data);
        }
    } catch (error) {
        console.error('❌ Supabase test failed:', error);
    }
}

// Define all missing functions BEFORE DOMContentLoaded
function initializeMobileNavigation() {
    console.log('✅ Mobile navigation initialized');
    
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('nav ul');
    
    if (!mobileMenuBtn || !navMenu) {
        console.warn('⚠️ Mobile menu button or nav menu not found');
        return;
    }
    
    // Remove any existing event listeners by cloning
    const newMobileMenuBtn = mobileMenuBtn.cloneNode(true);
    mobileMenuBtn.parentNode.replaceChild(newMobileMenuBtn, mobileMenuBtn);
    
    newMobileMenuBtn.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        console.log('🍔 Hamburger clicked!');
        
        navMenu.classList.toggle('active');
        const icon = this.querySelector('i');
        
        if (navMenu.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
            document.body.style.overflow = 'hidden';
            console.log('✅ Menu opened');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
            document.body.style.overflow = 'auto';
            console.log('✅ Menu closed');
        }
    });

    // Close menu when clicking on nav links
    const navLinks = navMenu.querySelectorAll('a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                navMenu.classList.remove('active');
                const icon = newMobileMenuBtn.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
                document.body.style.overflow = 'auto';
            }
        });
    });

    // Close menu on window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            navMenu.classList.remove('active');
            const icon = newMobileMenuBtn.querySelector('i');
            if (icon) {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
            document.body.style.overflow = 'auto';
        }
    });
}

function initializeScrollEffects() {
    console.log('✅ Scroll effects initialized');
    
    // Parallax scrolling effect
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallax = document.querySelector('.hero-section');
        const speed = 0.5;
        
        if (parallax) {
            parallax.style.transform = `translateY(${scrolled * speed}px)`;
        }
    });

    // Navbar background change on scroll
    const navbar = document.querySelector('header');
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    // Show/hide scroll to top button
    const scrollTopBtn = document.createElement('button');
    scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollTopBtn.className = 'scroll-top-btn';
    scrollTopBtn.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: #c69320;
        color: white;
        border: none;
        border-radius: 50%;
        width: 50px;
        height: 50px;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        font-size: 18px;
    `;
    document.body.appendChild(scrollTopBtn);

    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            scrollTopBtn.style.opacity = '1';
            scrollTopBtn.style.visibility = 'visible';
        } else {
            scrollTopBtn.style.opacity = '0';
            scrollTopBtn.style.visibility = 'hidden';
        }
    });

    scrollTopBtn.addEventListener('click', function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

function initializeGSAPReveals() {
    console.log('✅ GSAP reveals initialized');
    
    // Check if GSAP is loaded
    if (typeof gsap === 'undefined') {
        console.warn('⚠️ GSAP not loaded, using fallback animations');
        return;
    }

    // Fade in animations for elements
    gsap.registerPlugin(ScrollTrigger);
    
    // Hero section animation
    gsap.from('.hero-content h1', {
        duration: 1,
        y: 50,
        opacity: 0,
        ease: 'power2.out'
    });

    gsap.from('.hero-content p', {
        duration: 1,
        y: 30,
        opacity: 0,
        delay: 0.2,
        ease: 'power2.out'
    });

    // Cards animation on scroll
    gsap.from('.program-card, .value-card, .team-card', {
        duration: 0.8,
        y: 50,
        opacity: 0,
        stagger: 0.2,
        scrollTrigger: {
            trigger: '.programs-section',
            start: 'top 80%'
        }
    });
}

function initializeParticles() {
    console.log('✅ Particles initialized');
    
    // Create particle background effect
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles-container';
    particlesContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: -1;
        overflow: hidden;
    `;
    document.body.appendChild(particlesContainer);

    // Create floating particles
    function createParticle() {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 4 + 2}px;
            height: ${Math.random() * 4 + 2}px;
            background: rgba(198, 147, 32, 0.3);
            border-radius: 50%;
            animation: float ${Math.random() * 20 + 10}s linear infinite;
            left: ${Math.random() * 100}%;
            top: 100%;
        `;
        particlesContainer.appendChild(particle);

        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        }, 30000);
    }

    // Add CSS for particle animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes float {
            0% {
                transform: translateY(0) rotate(0deg);
                opacity: 1;
            }
            100% {
                transform: translateY(-100vh) rotate(360deg);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);

    // Create particles periodically
    setInterval(createParticle, 2000);
}

function initializePortfolioFilter() {
    console.log('✅ Portfolio filter initialized');
    
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item, .portfolio-item');

    if (filterButtons.length && galleryItems.length) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                filterButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
                
                const filterValue = this.getAttribute('data-filter');
                
                galleryItems.forEach((item, index) => {
                    const shouldShow = filterValue === 'all' || 
                                     item.getAttribute('data-category') === filterValue ||
                                     item.classList.contains(filterValue);
                    
                    if (shouldShow) {
                        setTimeout(() => {
                            item.style.display = 'block';
                            item.classList.add('filter-show');
                            item.classList.remove('filter-hide');
                        }, index * 100);
                    } else {
                        item.classList.add('filter-hide');
                        item.classList.remove('filter-show');
                        setTimeout(() => {
                            item.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }

    // Add CSS for filter animations
    const filterStyle = document.createElement('style');
    filterStyle.textContent = `
        .filter-show {
            animation: fadeInScale 0.5s ease-out forwards;
        }
        .filter-hide {
            animation: fadeOutScale 0.3s ease-out forwards;
        }
        @keyframes fadeInScale {
            0% { opacity: 0; transform: scale(0.8); }
            100% { opacity: 1; transform: scale(1); }
        }
        @keyframes fadeOutScale {
            0% { opacity: 1; transform: scale(1); }
            100% { opacity: 0; transform: scale(0.8); }
        }
    `;
    document.head.appendChild(filterStyle);
}

// Wait for DOM to be fully loaded 
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 DOM loaded - initializing components');
    
    // Test Supabase after DOM loads
    setTimeout(testSupabase, 1000);
    
    // Initialize all components
    initializeMobileNavigation();
    initializeScrollEffects();
    initializeGSAPReveals();
    initializeParticles();
    initializePortfolioFilter();
    initializeScholarshipForm();
    
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
            if (modal) {
                modal.style.display = 'flex';
                document.body.style.overflow = 'hidden';
            }
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
            filterButtons.forEach(btn => btn.classList.remove('active'));
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
                    const title = overlay.querySelector('h3')?.textContent || '';
                    const description = overlay.querySelector('p')?.textContent || '';
                    modalCaption.textContent = title + ' - ' + description;
                }
            }
        });
    });

    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        if (question) {
            question.addEventListener('click', function() {
                faqItems.forEach(otherItem => {
                    if (otherItem !== item && otherItem.classList.contains('active')) {
                        otherItem.classList.remove('active');
                    }
                });
                item.classList.toggle('active');
            });
        }
    });

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

    // Smooth scroll for anchor links
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
    
    if (header) {
        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;
            
            if (currentScroll > 100) {
                header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
            } else {
                header.style.boxShadow = '0 4px 6px rgba(198, 147, 32, 0.2)';
            }
            
            lastScroll = currentScroll;
        });
    }
});

// Scholarship Form to Supabase
function initializeScholarshipForm() {
    const form = document.getElementById("scholarshipForm");
    if (!form) {
        console.warn("⚠️ Scholarship form not found in DOM");
        return;
    }
    
    console.log('✅ Scholarship form found:', form);
    
    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const fullName = document.getElementById("fullName")?.value.trim();
        const email = document.getElementById("email")?.value.trim();
        const phone = document.getElementById("phone")?.value.trim();
        const dob = document.getElementById("dob")?.value;
        const address = document.getElementById("address")?.value.trim();
        const scholarshipType = document.getElementById("scholarshipType")?.value;
        const currentClass = document.getElementById("currentClass")?.value.trim();
        const institution = document.getElementById("institution")?.value.trim();
        const percentage = document.getElementById("percentage")?.value;
        const familyIncome = document.getElementById("familyIncome")?.value;
        const guardianName = document.getElementById("guardianName")?.value.trim();
        const essay = document.getElementById("essay")?.value.trim();
        const terms = document.querySelector('input[name="terms"]')?.checked;

        if (!fullName || !email || !phone || !dob || !address || !scholarshipType || !currentClass || !institution || !percentage || !familyIncome || !guardianName || !essay || !terms) {
            alert("Please fill all required fields and accept the terms");
            return;
        }

        if (essay.split(/\s+/).length < 20) {
            alert("Please write at least 20 words for the scholarship essay");
            return;
        }

        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = "Submitting Application...";
        submitBtn.disabled = true;

        try {
            const { data, error } = await supabase
                .from("scholarship_applications")
                .insert([{
                    full_name: fullName,
                    email: email,
                    phone: phone,
                    date_of_birth: dob,
                    address: address,
                    scholarship_type: scholarshipType,
                    current_class: currentClass,
                    institution: institution,
                    percentage: parseFloat(percentage),
                    family_income: parseFloat(familyIncome),
                    guardian_name: guardianName,
                    essay: essay,
                    terms_accepted: terms,
                    application_date: new Date().toISOString(),
                    status: 'pending'
                }]);

            if (error) {
                console.error("❌ Supabase insert error:", error);
                alert("Failed to submit application. Please try again later.");
            } else {
                console.log("✅ Scholarship application submitted successfully:", data);
                alert("Application submitted successfully! We will review your application and contact you soon.");
                form.reset();
            }
        } catch (err) {
            console.error("❌ Unexpected error:", err);
            alert("Something went wrong. Please try again.");
        } finally {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }
    });
    
    console.log('✅ Scholarship form initialized');
}
