// Forgot Password functionality
document.addEventListener('DOMContentLoaded', function() {
    const forgotForm = document.getElementById('forgotForm');
    const successMessage = document.getElementById('successMessage');
    const userEmail = document.getElementById('userEmail');
    const resendBtn = document.getElementById('resendBtn');
    const tryDifferentEmail = document.getElementById('tryDifferentEmail');
    const submitBtn = document.querySelector('.submit-btn');
    const steps = document.querySelectorAll('.step');

    // Form submission
    forgotForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = document.getElementById('email').value;
        
        // Validation
        if (!email || !isValidEmail(email)) {
            showError('Please enter a valid email address');
            return;
        }
        
        // Show loading state
        setLoadingState(true, submitBtn);
        
        // Simulate API call
        setTimeout(() => {
            setLoadingState(false, submitBtn);
            
            // Show success message
            showSuccessState(email);
            
        }, 2000);
    });

    // Resend email functionality
    resendBtn.addEventListener('click', function() {
        const email = userEmail.textContent;
        
        setLoadingState(true, resendBtn);
        
        // Simulate resend API call
        setTimeout(() => {
            setLoadingState(false, resendBtn);
            showSuccess('Reset instructions sent again!');
        }, 1500);
    });

    // Try different email
    tryDifferentEmail.addEventListener('click', function() {
        // Reset to initial state
        forgotForm.style.display = 'block';
        successMessage.style.display = 'none';
        
        // Reset steps
        steps.forEach((step, index) => {
            if (index === 0) {
                step.classList.add('active');
            } else {
                step.classList.remove('active');
            }
        });
        
        // Clear email field
        document.getElementById('email').value = '';
        document.getElementById('email').focus();
    });

    // Utility functions
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function setLoadingState(loading, button) {
        if (loading) {
            button.classList.add('loading');
            button.disabled = true;
        } else {
            button.classList.remove('loading');
            button.disabled = false;
        }
    }

    function showSuccessState(email) {
        // Update steps
        steps.forEach((step, index) => {
            if (index === 1) {
                step.classList.add('active');
            } else if (index > 1) {
                step.classList.remove('active');
            }
        });
        
        // Update user email in message
        userEmail.textContent = email;
        
        // Show success message
        forgotForm.style.display = 'none';
        successMessage.style.display = 'block';
        
        // Add animations to success message elements
        const successElements = successMessage.querySelectorAll('*');
        successElements.forEach((el, index) => {
            el.style.animation = `fadeInUp 0.6s ease forwards ${index * 0.1 + 0.1}s`;
            el.style.opacity = '0';
        });
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

    // Input focus effects
    document.querySelectorAll('input').forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.classList.remove('focused');
        });
    });

    // Email validation on input
    const emailInput = document.getElementById('email');
    emailInput.addEventListener('input', function() {
        if (this.value && !isValidEmail(this.value)) {
            this.style.borderColor = '#e74c3c';
            this.parentElement.querySelector('i').style.color = '#e74c3c';
        } else {
            this.style.borderColor = this.value ? '#1db954' : '#e9ecef';
            this.parentElement.querySelector('i').style.color = this.value ? '#1db954' : '#666';
        }
    });
});