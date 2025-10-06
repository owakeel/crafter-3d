// Toggle mobile menu
// document.addEventListener('DOMContentLoaded', function () {
//     const menuToggle = document.querySelector('.menu-toggle');
//     const navLinks = document.querySelector('.nav-links');

//     // Toggle menu when hamburger is clicked
//     if (menuToggle) {
//         menuToggle.addEventListener('click', function () {
//             navLinks.classList.toggle('active');

//             // Change hamburger icon based on menu state
//             if (navLinks.classList.contains('active')) {
//                 menuToggle.textContent = '✕';
//             } else {
//                 menuToggle.textContent = '☰';
//             }
//         });
//     }

//     // Close menu when clicking on a link (for mobile)
//     document.querySelectorAll('.nav-links a').forEach(link => {
//         link.addEventListener('click', () => {
//             navLinks.classList.remove('active');
//             if (menuToggle) {
//                 menuToggle.textContent = '☰';
//             }
//         });
//     });

//     // Close menu when clicking outside (for mobile)
//     document.addEventListener('click', function (event) {
//         const isClickInsideNav = document.querySelector('.navbar').contains(event.target);

//         if (!isClickInsideNav && navLinks.classList.contains('active')) {
//             navLinks.classList.remove('active');
//             if (menuToggle) {
//                 menuToggle.textContent = '☰';
//             }
//         }
//     });

//     // Close menu when window is resized to desktop size
//     window.addEventListener('resize', function () {
//         if (window.innerWidth > 768) {
//             navLinks.classList.remove('active');
//             if (menuToggle) {
//                 menuToggle.textContent = '☰';
//             }
//         }
//     });
// });

// Mega Menu functionality
        // document.addEventListener('DOMContentLoaded', function() {
        //     const navItems = document.querySelectorAll('.nav-item');
            
        //     navItems.forEach(item => {
        //         item.addEventListener('mouseenter', function() {
        //             // Close all other mega menus
        //             navItems.forEach(otherItem => {
        //                 if (otherItem !== item) {
        //                     const otherMegaMenu = otherItem.querySelector('.mega-menu');
        //                     if (otherMegaMenu) {
        //                         otherMegaMenu.style.display = 'none';
        //                     }
        //                 }
        //             });
                    
        //             // Open current mega menu if it exists
        //             const megaMenu = this.querySelector('.mega-menu');
        //             if (megaMenu) {
        //                 megaMenu.style.display = 'grid';
        //             }
        //         });
                
        //         item.addEventListener('mouseleave', function() {
        //             const megaMenu = this.querySelector('.mega-menu');
        //             if (megaMenu) {
        //                 // Small delay before closing to allow moving to mega menu
        //                 setTimeout(() => {
        //                     if (!megaMenu.matches(':hover') && !this.matches(':hover')) {
        //                         megaMenu.style.display = 'none';
        //                     }
        //                 }, 100);
        //             }
        //         });
                
        //         const megaMenu = item.querySelector('.mega-menu');
        //         if (megaMenu) {
        //             megaMenu.addEventListener('mouseleave', function() {
        //                 this.style.display = 'none';
        //             });
        //         }
        //     });

        //     // Carousel functionality
        //     const carouselInner = document.querySelector('.carousel-inner');
        //     const carouselItems = document.querySelectorAll('.carousel-item');
        //     const prevButton = document.querySelector('.carousel-control.prev');
        //     const nextButton = document.querySelector('.carousel-control.next');
        //     const indicators = document.querySelectorAll('.indicator');

        //     let currentSlide = 0;
        //     const totalSlides = carouselItems.length;

        //     // Function to show a specific slide
        //     function showSlide(index) {
        //         // Hide all slides
        //         carouselItems.forEach(item => {
        //             item.classList.remove('active');
        //         });

        //         // Remove active class from all indicators
        //         indicators.forEach(indicator => {
        //             indicator.classList.remove('active');
        //         });

        //         // Show the selected slide
        //         carouselItems[index].classList.add('active');

        //         // Update the active indicator
        //         indicators[index].classList.add('active');

        //         // Update current slide
        //         currentSlide = index;
        //     }

        //     // Function to show next slide
        //     function nextSlide() {
        //         let nextIndex = (currentSlide + 1) % totalSlides;
        //         showSlide(nextIndex);
        //     }

        //     // Function to show previous slide
        //     function prevSlide() {
        //         let prevIndex = (currentSlide - 1 + totalSlides) % totalSlides;
        //         showSlide(prevIndex);
        //     }

        //     // Auto slide every 5 seconds
        //     let slideInterval = setInterval(nextSlide, 5000);

        //     // Event listeners for controls
        //     prevButton.addEventListener('click', function() {
        //         prevSlide();
        //         resetInterval();
        //     });

        //     nextButton.addEventListener('click', function() {
        //         nextSlide();
        //         resetInterval();
        //     });

        //     // Event listeners for indicators
        //     indicators.forEach((indicator, index) => {
        //         indicator.addEventListener('click', function() {
        //             showSlide(index);
        //             resetInterval();
        //         });
        //     });

        //     // Reset interval when user interacts with carousel
        //     function resetInterval() {
        //         clearInterval(slideInterval);
        //         slideInterval = setInterval(nextSlide, 5000);
        //     }

        //     // Pause carousel on hover
        //     carouselInner.addEventListener('mouseenter', function() {
        //         clearInterval(slideInterval);
        //     });

        //     carouselInner.addEventListener('mouseleave', function() {
        //         resetInterval();
        //     });

        //     // Keyboard navigation
        //     document.addEventListener('keydown', function(e) {
        //         if (e.key === 'ArrowLeft') {
        //             prevSlide();
        //             resetInterval();
        //         } else if (e.key === 'ArrowRight') {
        //             nextSlide();
        //             resetInterval();
        //         }
        //     });

        //     // Touch swipe support for mobile devices
        //     let touchStartX = 0;
        //     let touchEndX = 0;

        //     carouselInner.addEventListener('touchstart', function(e) {
        //         touchStartX = e.changedTouches[0].screenX;
        //     });

        //     carouselInner.addEventListener('touchend', function(e) {
        //         touchEndX = e.changedTouches[0].screenX;
        //         handleSwipe();
        //     });

        //     function handleSwipe() {
        //         const swipeThreshold = 50;

        //         if (touchEndX < touchStartX - swipeThreshold) {
        //             // Swipe left - next slide
        //             nextSlide();
        //             resetInterval();
        //         } else if (touchEndX > touchStartX + swipeThreshold) {
        //             // Swipe right - previous slide
        //             prevSlide();
        //             resetInterval();
        //         }
        //     }
        // });


 // Navbar Script
 document.addEventListener('DOMContentLoaded', function () {
    const navItems = document.querySelectorAll('.nav-item');
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');

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
    document.querySelectorAll('.nav-item').forEach(item => {
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
            item.addEventListener('click', function (e) {
                if (window.innerWidth <= 991) {
                    e.preventDefault();
                    item.classList.toggle('open');
                }
            });
        }
    });
});



// Carousel Script
        document.addEventListener('DOMContentLoaded', function () {
            const carouselInner = document.querySelector('.carousel-inner');
            const carouselItems = document.querySelectorAll('.carousel-item');
            const prevButton = document.querySelector('.carousel-control.prev');
            const nextButton = document.querySelector('.carousel-control.next');
            const indicators = document.querySelectorAll('.indicator');

            let currentSlide = 0;
            const totalSlides = carouselItems.length;

            function showSlide(index) {
                carouselItems.forEach(item => item.classList.remove('active'));
                indicators.forEach(indicator => indicator.classList.remove('active'));

                carouselItems[index].classList.add('active');
                indicators[index].classList.add('active');
                currentSlide = index;
            }

            function nextSlide() {
                let nextIndex = (currentSlide + 1) % totalSlides;
                showSlide(nextIndex);
            }

            function prevSlide() {
                let prevIndex = (currentSlide - 1 + totalSlides) % totalSlides;
                showSlide(prevIndex);
            }

            let slideInterval = setInterval(nextSlide, 5000);

            prevButton.addEventListener('click', () => {
                prevSlide();
                resetInterval();
            });

            nextButton.addEventListener('click', () => {
                nextSlide();
                resetInterval();
            });

            indicators.forEach((indicator, index) => {
                indicator.addEventListener('click', () => {
                    showSlide(index);
                    resetInterval();
                });
            });

            function resetInterval() {
                clearInterval(slideInterval);
                slideInterval = setInterval(nextSlide, 5000);
            }

            // Pause on hover
            carouselInner.addEventListener('mouseenter', () => clearInterval(slideInterval));
            carouselInner.addEventListener('mouseleave', resetInterval);

            // Keyboard control
            document.addEventListener('keydown', function (e) {
                if (e.key === 'ArrowLeft') { prevSlide(); resetInterval(); }
                else if (e.key === 'ArrowRight') { nextSlide(); resetInterval(); }
            });

            // Touch swipe
            let touchStartX = 0, touchEndX = 0;
            carouselInner.addEventListener('touchstart', e => touchStartX = e.changedTouches[0].screenX);
            carouselInner.addEventListener('touchend', e => {
                touchEndX = e.changedTouches[0].screenX;
                handleSwipe();
            });

            function handleSwipe() {
                const swipeThreshold = 50;
                if (touchEndX < touchStartX - swipeThreshold) { nextSlide(); resetInterval(); }
                else if (touchEndX > touchStartX + swipeThreshold) { prevSlide(); resetInterval(); }
            }
        });


// Tools Section functionality
// document.addEventListener('DOMContentLoaded', function () {
//     // Add intersection observer for animation
//     const toolCards = document.querySelectorAll('.tool-card');

//     const observerOptions = {
//         threshold: 0.1,
//         rootMargin: '0px 0px -50px 0px'
//     };

//     const observer = new IntersectionObserver(function (entries) {
//         entries.forEach(entry => {
//             if (entry.isIntersecting) {
//                 entry.target.style.opacity = '1';
//                 entry.target.style.transform = 'translateY(0)';
//             }
//         });
//     }, observerOptions);

//     // Reset animations for observer
//     toolCards.forEach(card => {
//         card.style.opacity = '0';
//         card.style.transform = 'translateY(30px)';
//         card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
//         observer.observe(card);
//     });

//     // Add click handlers for tool cards
//     toolCards.forEach(card => {
//         card.addEventListener('click', function (e) {
//             if (!e.target.closest('.tool-link')) {
//                 const link = this.querySelector('.tool-link');
//                 if (link) {
//                     // Add ripple effect
//                     const ripple = document.createElement('span');
//                     ripple.style.cssText = `
//                         position: absolute;
//                         border-radius: 50%;
//                         background: rgba(29, 185, 84, 0.3);
//                         transform: scale(0);
//                         animation: ripple 0.6s linear;
//                         pointer-events: none;
//                     `;

//                     const rect = this.getBoundingClientRect();
//                     const size = Math.max(rect.width, rect.height);
//                     const x = e.clientX - rect.left - size / 2;
//                     const y = e.clientY - rect.top - size / 2;

//                     ripple.style.width = ripple.style.height = size + 'px';
//                     ripple.style.left = x + 'px';
//                     ripple.style.top = y + 'px';

//                     this.style.position = 'relative';
//                     this.appendChild(ripple);

//                     setTimeout(() => {
//                         ripple.remove();
//                     }, 600);

//                     // Navigate after animation
//                     setTimeout(() => {
//                         window.location.href = link.href;
//                     }, 300);
//                 }
//             }
//         });
//     });

//     // Add CSS for ripple effect
//     const style = document.createElement('style');
//     style.textContent = `
//         @keyframes ripple {
//             to {
//                 transform: scale(4);
//                 opacity: 0;
//             }
//         }
//     `;
//     document.head.appendChild(style);

//     // Parallax effect for section header
//     window.addEventListener('scroll', function () {
//         const scrolled = window.pageYOffset;
//         // const parallax = document.querySelector('.section-header h1');
//         if (parallax) {
//             const rate = scrolled * -0.5;
//             parallax.style.transform = `translateY(${rate}px)`;
//         }
//     });
// });




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

    // Add hover effects
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');

        question.addEventListener('mouseenter', function () {
            if (!item.classList.contains('active')) {
                this.style.background = '#f8f9fa';
            }
        });

        question.addEventListener('mouseleave', function () {
            if (!item.classList.contains('active')) {
                this.style.background = 'transparent';
            }
        });
    });

    // Close FAQ when clicking outside
    document.addEventListener('click', function (e) {
        if (!e.target.closest('.faq-item')) {
            faqItems.forEach(item => {
                item.classList.remove('active');
            });
        }
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