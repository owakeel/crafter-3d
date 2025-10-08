// Navbar Script
document.addEventListener('DOMContentLoaded', function () {
    const navItems = document.querySelectorAll('.nav-item');
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const overlay = document.querySelector('.menu-overlay'); // blur overlay

    // Toggle menu on mobile
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });

    // Close menu when clicking outside (mobile/tablet only)
    document.addEventListener('click', function (e) {
        if (window.innerWidth <= 991) {
            if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
                navMenu.classList.remove('active');
            }
        }
    });

    // Close menu when clicking on nav link (mobile)
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            if (window.innerWidth <= 991) {
                navMenu.classList.remove('active');
            }
        });
    });

    // Mega menu handling
    navItems.forEach(item => {
        const megaMenu = item.querySelector('.mega-menu');
        if (megaMenu) {
            //  For Desktop Hover
            item.addEventListener('mouseenter', () => {
                if (window.innerWidth > 991) {
                    megaMenu.style.display = 'grid';
                    overlay.style.display = 'block';
                }
            });

            item.addEventListener('mouseleave', () => {
                if (window.innerWidth > 991) {
                    setTimeout(() => {
                        if (!item.matches(':hover') && !megaMenu.matches(':hover')) {
                            megaMenu.style.display = 'none';
                            overlay.style.display = 'none';
                        }
                    }, 100);
                }
            });

            //  For Mobile Click
            item.addEventListener('click', function (e) {
                if (window.innerWidth <= 991) {
                    e.preventDefault();
                    item.classList.toggle('open');
                }
            });
        }
    });

    // Close mega menu when overlay clicked
    overlay.addEventListener('click', () => {
        overlay.style.display = 'none';
        document.querySelectorAll('.mega-menu').forEach(menu => {
            menu.style.display = 'none';
        });
    });
});



const slider = document.querySelector('.video-slider');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');

const scrollStep = 350;

nextBtn.addEventListener('click', () => {
    slider.scrollBy({ left: scrollStep, behavior: 'smooth' });
});

prevBtn.addEventListener('click', () => {
    slider.scrollBy({ left: -scrollStep, behavior: 'smooth' });
});




// Uses Section functionality
document.addEventListener('DOMContentLoaded', function () {
    // Add intersection observer for animation
    const useCards = document.querySelectorAll('.use-card');

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Reset animations for observer
    useCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });

    // Add click handlers for use cards
    useCards.forEach(card => {
        card.addEventListener('click', function () {
            // Add active state
            this.classList.add('active');

            // Remove active state from other cards
            useCards.forEach(otherCard => {
                if (otherCard !== this) {
                    otherCard.classList.remove('active');
                }
            });

            // Add ripple effect
            const ripple = document.createElement('span');
            ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                background: rgba(29, 185, 84, 0.2);
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
            `;

            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = rect.width / 2 - size / 2;
            const y = rect.height / 2 - size / 2;

            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';

            this.style.position = 'relative';
            this.appendChild(ripple);

            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Add CSS for active state and ripple effect
    const style = document.createElement('style');
    style.textContent = `
        .use-card.active {
            border-color: #1db954;
            box-shadow: 0 8px 30px rgba(29, 185, 84, 0.15);
        }
        
        @keyframes ripple {
            to {
                transform: scale(2.5);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);

    // Add hover sound effect (optional)
    useCards.forEach(card => {
        card.addEventListener('mouseenter', function () {
            this.style.cursor = 'pointer';
        });
    });
});

// Learn Section functionality
document.addEventListener('DOMContentLoaded', function () {
    // Add intersection observer for animation
    const learnLeft = document.querySelector('.learn-left');
    const learnRight = document.querySelector('.learn-right');

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.classList.contains('learn-left')) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateX(0)';
                } else if (entry.target.classList.contains('learn-right')) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateX(0)';
                }
            }
        });
    }, observerOptions);

    // Reset animations for observer
    if (learnLeft) {
        learnLeft.style.opacity = '0';
        learnLeft.style.transform = 'translateX(-30px)';
        learnLeft.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(learnLeft);
    }

    if (learnRight) {
        learnRight.style.opacity = '0';
        learnRight.style.transform = 'translateX(30px)';
        learnRight.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(learnRight);
    }

    // Add click handlers for review cards
    const reviewCards = document.querySelectorAll('.review-card');

    reviewCards.forEach(card => {
        card.addEventListener('click', function () {
            // Add active state
            this.classList.add('active');

            // Remove active state from other cards
            reviewCards.forEach(otherCard => {
                if (otherCard !== this) {
                    otherCard.classList.remove('active');
                }
            });

            // Add ripple effect
            const ripple = document.createElement('span');
            ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                background: rgba(29, 185, 84, 0.2);
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
            `;

            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = rect.width / 2 - size / 2;
            const y = rect.height / 2 - size / 2;

            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';

            this.style.position = 'relative';
            this.appendChild(ripple);

            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Add click handlers for learning cards
    const learnLinks = document.querySelectorAll('.learn-link, .secondary-link');

    learnLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();

            // Add click animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);

            // Simulate navigation (replace with actual navigation)
            console.log('Navigating to:', this.getAttribute('href'));
        });
    });

    // Add CSS for active state and ripple effect
    const style = document.createElement('style');
    style.textContent = `
        .review-card.active {
            border-color: #1db954;
            background: #f8fff8;
        }
        
        @keyframes ripple {
            to {
                transform: scale(2.5);
                opacity: 0;
            }
        }
        
        .learn-link, .secondary-link {
            position: relative;
            overflow: hidden;
        }
    `;
    document.head.appendChild(style);
});

// Reviews Section functionality
document.addEventListener('DOMContentLoaded', function () {
    // Add intersection observer for animation
    const bigCard = document.querySelector('.big-card');
    const reviewCards = document.querySelectorAll('.review-card:not(.big-card)');

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.classList.contains('big-card')) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateX(0)';
                } else {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            }
        });
    }, observerOptions);

    // Reset animations for observer
    if (bigCard) {
        bigCard.style.opacity = '0';
        bigCard.style.transform = 'translateX(-30px)';
        bigCard.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(bigCard);
    }

    reviewCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });

    // Add click handlers for review cards
    reviewCards.forEach(card => {
        card.addEventListener('click', function () {
            // Add active state
            this.classList.toggle('active');

            // Remove active state from other cards
            reviewCards.forEach(otherCard => {
                if (otherCard !== this) {
                    otherCard.classList.remove('active');
                }
            });

            // Add ripple effect
            const ripple = document.createElement('span');
            ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                background: rgba(29, 185, 84, 0.1);
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
            `;

            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = rect.width / 2 - size / 2;
            const y = rect.height / 2 - size / 2;

            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';

            this.style.position = 'relative';
            this.appendChild(ripple);

            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Add hover effect for big card
    if (bigCard) {
        bigCard.addEventListener('mouseenter', function () {
            this.style.cursor = 'pointer';
        });

        bigCard.addEventListener('click', function () {
            const ripple = document.createElement('span');
            ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.3);
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
            `;

            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = rect.width / 2 - size / 2;
            const y = rect.height / 2 - size / 2;

            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';

            this.style.position = 'relative';
            this.appendChild(ripple);

            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    }

    // Add CSS for active state and ripple effect
    const style = document.createElement('style');
    style.textContent = `
        .review-card:not(.big-card).active {
            background: #f8fff8;
            border-color: #1db954;
        }
        
        @keyframes ripple {
            to {
                transform: scale(2.5);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
});


// FAQ Section functionality
document.addEventListener('DOMContentLoaded', function () {
    // Add intersection observer for animation
    const faqItems = document.querySelectorAll('.faq-item');

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Reset animations for observer
    faqItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(item);
    });

    // FAQ toggle functionality
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        const toggle = item.querySelector('.faq-toggle');

        question.addEventListener('click', function () {
            // Toggle active class
            const isActive = item.classList.contains('active');

            // Close all other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });

            // Toggle current item
            if (!isActive) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
    });

    // FAQ hover image change
    const faqImg = document.querySelector('.faq-img');
    const faqItemsList = document.querySelectorAll('.faq-item');

    faqItemsList.forEach(item => {
        item.addEventListener('mouseenter', () => {
            const newImg = item.getAttribute('data-img');
            if (newImg) {
                faqImg.style.opacity = 0;
                setTimeout(() => {
                    faqImg.src = newImg;
                    faqImg.style.opacity = 1;
                }, 200);
            }
        });

        // Optional: Reset to default image when mouse leaves
        item.addEventListener('mouseleave', () => {
            faqImg.style.opacity = 0;
            setTimeout(() => {
                faqImg.src = './images/cat.jpg';
                faqImg.style.opacity = 1;
            }, 200);
        });
    });



    // Keyboard navigation
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
            faqItems.forEach(item => {
                item.classList.remove('active');
            });
        }
    });
});

// Footer functionality
document.addEventListener('DOMContentLoaded', function () {
    // Newsletter form submission
    const newsletterForm = document.querySelector('.newsletter-form');

    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value.trim();

            if (email) {
                // Here you would typically send the email to your server
                console.log('Subscribed email:', email);
                alert('Thank you for subscribing to our newsletter!');
                emailInput.value = '';
            } else {
                alert('Please enter a valid email address.');
            }
        });
    }

    // Smooth scrolling for anchor links
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

    // Add current year to copyright
    const copyrightElement = document.querySelector('.copyright p');
    if (copyrightElement) {
        const currentYear = new Date().getFullYear();
        copyrightElement.innerHTML = copyrightElement.innerHTML.replace('2025', currentYear);
    }
});

var swiper = new Swiper(".mySwiper", {});