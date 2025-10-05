// Contact Page functionality
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const submitBtn = document.querySelector('.submit-btn');

    // Form submission
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validate form
        const errors = validateForm();
        
        if (errors.length > 0) {
            showError('Please fix the errors in the form');
            return;
        }
        
        // Show loading state
        setLoadingState(true);
        
        // Simulate API call
        setTimeout(() => {
            setLoadingState(false);
            
            // Show success message
            showSuccess('Message sent successfully! We\'ll get back to you within 24 hours.');
            
            // Reset form
            contactForm.reset();
            
        }, 2000);
    });

    // Real-time form validation
    const formInputs = contactForm.querySelectorAll('input, select, textarea');
    
    formInputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
        
        input.addEventListener('input', function() {
            clearFieldError(this);
        });
    });

    // Method card interactions
    const methodCards = document.querySelectorAll('.method-card');
    
    methodCards.forEach(card => {
        card.addEventListener('click', function(e) {
            if (e.target.classList.contains('method-btn')) {
                const formType = e.target.getAttribute('href').replace('#', '');
                scrollToForm(formType);
            }
        });
    });

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

    // Utility functions
    function validateForm() {
        const errors = [];
        const formData = new FormData(contactForm);
        
        // Required fields validation
        const requiredFields = ['firstName', 'lastName', 'email', 'subject', 'message'];
        
        requiredFields.forEach(field => {
            const input = document.getElementById(field);
            if (!input.value.trim()) {
                errors.push(`${field} is required`);
                markFieldError(input);
            }
        });
        
        // Email validation
        const email = document.getElementById('email').value;
        if (email && !isValidEmail(email)) {
            errors.push('Please enter a valid email address');
            markFieldError(document.getElementById('email'));
        }
        
        return errors;
    }

    function validateField(field) {
        const value = field.value.trim();
        
        if (field.hasAttribute('required') && !value) {
            markFieldError(field);
            return false;
        }
        
        if (field.type === 'email' && value && !isValidEmail(value)) {
            markFieldError(field);
            return false;
        }
        
        clearFieldError(field);
        return true;
    }

    function markFieldError(field) {
        field.parentElement.classList.add('error');
        
        // Add error message if not exists
        if (!field.parentElement.querySelector('.error-message')) {
            const errorMsg = document.createElement('div');
            errorMsg.className = 'error-message';
            errorMsg.textContent = getFieldErrorMessage(field);
            field.parentElement.appendChild(errorMsg);
        }
    }

    function clearFieldError(field) {
        field.parentElement.classList.remove('error');
        const errorMsg = field.parentElement.querySelector('.error-message');
        if (errorMsg) {
            errorMsg.remove();
        }
    }

    function getFieldErrorMessage(field) {
        if (field.hasAttribute('required') && !field.value.trim()) {
            return 'This field is required';
        }
        
        if (field.type === 'email' && !isValidEmail(field.value)) {
            return 'Please enter a valid email address';
        }
        
        return 'Please check this field';
    }

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function setLoadingState(loading) {
        if (loading) {
            submitBtn.classList.add('loading');
            submitBtn.disabled = true;
        } else {
            submitBtn.classList.remove('loading');
            submitBtn.disabled = false;
        }
    }

    function scrollToForm(formType) {
        const formSection = document.querySelector('.contact-form-section');
        formSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
        
        // Highlight relevant form fields based on the method
        setTimeout(() => {
            const subjectSelect = document.getElementById('subject');
            switch(formType) {
                case 'support-form':
                    subjectSelect.value = 'technical-support';
                    break;
                case 'sales-form':
                    subjectSelect.value = 'sales';
                    break;
                case 'community-form':
                    subjectSelect.value = 'other';
                    document.getElementById('message').placeholder = 'Tell us about your community interests or media inquiry...';
                    break;
            }
        }, 500);
    }

    function showError(message) {
        showMessage(message, 'error');
    }

    function showSuccess(message) {
        showMessage(message, 'success');
    }

    function showMessage(message, type = 'info') {
        // Remove existing messages
        const existingMessage = document.querySelector('.message');
        if (existingMessage) {
            existingMessage.remove();
        }

        // Create message element
        const messageEl = document.createElement('div');
        messageEl.className = `message message-${type}`;
        messageEl.textContent = message;
        
        // Add styles
        messageEl.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 20px;
            border-radius: 10px;
            color: white;
            font-weight: 500;
            z-index: 1000;
            animation: slideInRight 0.3s ease;
            max-width: 300px;
        `;
        
        if (type === 'error') {
            messageEl.style.background = '#e74c3c';
        } else if (type === 'success') {
            messageEl.style.background = '#1db954';
        } else {
            messageEl.style.background = '#3498db';
        }

        document.body.appendChild(messageEl);

        // Auto remove after 5 seconds
        setTimeout(() => {
            if (messageEl.parentNode) {
                messageEl.style.animation = 'slideOutRight 0.3s ease';
                setTimeout(() => {
                    if (messageEl.parentNode) {
                        messageEl.remove();
                    }
                }, 300);
            }
        }, 5000);
    }

    // Add CSS for animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOutRight {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
        
        .message {
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
        }
    `;
    document.head.appendChild(style);

    // Add hover effects to method cards
    methodCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Phone number formatting
    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', function(e) {
            const x = e.target.value.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
            e.target.value = !x[2] ? x[1] : '(' + x[1] + ') ' + x[2] + (x[3] ? '-' + x[3] : '');
        });
    }

    // Character counter for message
    const messageTextarea = document.getElementById('message');
    if (messageTextarea) {
        const counter = document.createElement('div');
        counter.className = 'char-counter';
        counter.style.cssText = `
            text-align: right;
            font-size: 0.8rem;
            color: #666;
            margin-top: 5px;
        `;
        messageTextarea.parentElement.appendChild(counter);

        messageTextarea.addEventListener('input', function() {
            const count = this.value.length;
            counter.textContent = `${count}/2000 characters`;
            
            if (count > 1800) {
                counter.style.color = '#e74c3c';
            } else if (count > 1500) {
                counter.style.color = '#f39c12';
            } else {
                counter.style.color = '#666';
            }
        });
    }
});