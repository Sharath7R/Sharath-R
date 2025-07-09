document.addEventListener('DOMContentLoaded', function () {
    // Tab functionality
    const tablinks = document.getElementsByClassName('tablink');
    const tabcontents = document.getElementsByClassName('tab-content');

    function opentab(event, tabname) {
        // Hide all tab contents with animation
        for (const tabcontent of tabcontents) {
            tabcontent.style.display = 'none';
            tabcontent.classList.remove('active-tab');
        }
        // Remove active-link class from all tab links
        for (const tablink of tablinks) {
            tablink.classList.remove('active-link');
        }
        // Add active-link class to the clicked tab and show the corresponding content
        event.currentTarget.classList.add('active-link');
        const activeTabContent = document.getElementById(tabname);
        if (activeTabContent) {
            activeTabContent.style.display = 'block';
            setTimeout(() => {
                activeTabContent.classList.add('active-tab');
            }, 10);
        }
    }

    // Attach click event listeners to tablinks
    for (const tablink of tablinks) {
        tablink.addEventListener('click', function (event) {
            opentab(event, tablink.dataset.tabname);
        });
    }

    // Initialize: Show the first tab by default
    if (tablinks.length > 0 && tabcontents.length > 0) {
        tablinks[0].classList.add('active-link');
        tabcontents[0].style.display = 'block';
        tabcontents[0].classList.add('active-tab');
    }

    // Tab Bar Navigation Functionality
    const tabItems = document.querySelectorAll('.tab-item');
    const sections = document.querySelectorAll('section[id]');

    // Handle tab item clicks
    tabItems.forEach(item => {
        item.addEventListener('click', function(e) {
            const target = this.getAttribute('data-target');
            if (target && target !== 'hero') {
                e.preventDefault();
                const targetElement = document.getElementById(target);
                if (targetElement) {
                    const headerOffset = 80;
                    const elementPosition = targetElement.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            } else if (target === 'hero') {
                e.preventDefault();
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Update active tab based on scroll position
    function updateActiveTab() {
        const scrollPosition = window.scrollY + 150;
        
        // Check if we're at the very top (home section)
        if (window.scrollY < 100) {
            setActiveTab('hero');
            return;
        }

        // Find the current section
        let currentSection = 'hero';
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top + window.pageYOffset;
            if (scrollPosition >= sectionTop) {
                currentSection = section.id;
            }
        });

        setActiveTab(currentSection);
    }

    function setActiveTab(targetId) {
        tabItems.forEach(item => {
            const target = item.getAttribute('data-target');
            if (target === targetId) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
    }

    // Throttled scroll listener for performance
    let ticking = false;
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateActiveTab);
            ticking = true;
            setTimeout(() => { ticking = false; }, 100);
        }
    }

    window.addEventListener('scroll', requestTick);

    // Scroll animations using Intersection Observer
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

    // Animate elements on scroll
    const animateOnScroll = document.querySelectorAll('.project, .skill, .about');
    animateOnScroll.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Smooth scrolling is now handled by the tab bar functionality above

    // Add parallax effect to hero section
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const heroImg = document.querySelector('.hero-img');
        
        if (heroImg) {
            heroImg.style.transform = `translateY(${scrolled * 0.2}px)`;
        }
    });

    // Add typing animation effect
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

    // Initialize typing animation for hero text
    const heroTitle = document.querySelector('.hero-content h1');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        setTimeout(() => {
            typeWriter(heroTitle, originalText, 80);
        }, 1000);
    }

    // Add hover effects for skill cards
    const skillCards = document.querySelectorAll('.skill');
    skillCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.05)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Add tilt effect for project cards
    const projectCards = document.querySelectorAll('.project');
    projectCards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    });

    // Navbar scroll effect
    const navigation = document.querySelector('.navigation');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navigation.style.background = 'rgba(15, 23, 42, 0.95)';
            navigation.style.backdropFilter = 'blur(20px)';
        } else {
            navigation.style.background = 'rgba(15, 23, 42, 0.8)';
            navigation.style.backdropFilter = 'blur(10px)';
        }
    });

    // Form submission (keeping the original functionality)
    const scriptURL = 'https://script.google.com/macros/s/AKfycbx8U2mJ-JR2XfkN58IKrjbkmFSXXDwb3VrFnD5Dw1pTnezwl0agundtFPh9teeTwBS5lw/exec';
    const form = document.forms['submit-to-google-sheet'];
    const msg = document.getElementById('msg');

    if (form) {
        form.addEventListener('submit', e => {
            e.preventDefault();
            fetch(scriptURL, { method: 'POST', body: new FormData(form) })
                .then(response => {
                    if (msg) {
                        msg.innerHTML = "Message Sent Successfully";
                        msg.style.color = 'var(--success)';
                        setTimeout(function () {
                            msg.innerHTML = "";
                        }, 5000);
                    }
                    form.reset();
                })
                .catch(error => {
                    console.error('Error!', error.message);
                    if (msg) {
                        msg.innerHTML = "Error sending message. Please try again.";
                        msg.style.color = 'var(--bright)';
                    }
                });
        });
    }

    // Add loading animation
    window.addEventListener('load', () => {
        document.body.classList.add('loaded');
    });

    // Add custom cursor effect (optional)
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    document.body.appendChild(cursor);

    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });

    // Add click ripple effect
    function createRipple(event) {
        const button = event.currentTarget;
        const ripple = document.createElement('span');
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        button.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }

    // Add ripple effect to buttons
    const buttons = document.querySelectorAll('.linkedin-button, .tablink');
    buttons.forEach(button => {
        button.addEventListener('click', createRipple);
    });

    // Scroll to top functionality
    const scrollToTopBtn = document.getElementById('scrollToTop');
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.classList.add('visible');
        } else {
            scrollToTopBtn.classList.remove('visible');
        }
    });

    window.scrollToTop = function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    // Improved button hover effects
    const allButtons = document.querySelectorAll('.linkedin-button');
    allButtons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.02)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Add scroll progress indicator
    const progressBar = document.createElement('div');
    progressBar.style.position = 'fixed';
    progressBar.style.top = '0';
    progressBar.style.left = '0';
    progressBar.style.width = '0%';
    progressBar.style.height = '3px';
    progressBar.style.background = 'linear-gradient(135deg, var(--accent), var(--bright))';
    progressBar.style.zIndex = '10000';
    progressBar.style.transition = 'width 0.1s ease';
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        progressBar.style.width = scrolled + '%';
    });

    // Enhanced project card animations
    const animatedProjectCards = document.querySelectorAll('.project');
    animatedProjectCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });

    // Add keyboard navigation support
    document.addEventListener('keydown', (e) => {
        // No specific keydown handling for mobile menu anymore
    });

    // Performance optimization: Lazy load images
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
});
