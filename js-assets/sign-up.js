// Sign Up Page functionality
document.addEventListener('DOMContentLoaded', function() {
    const signupForm = document.getElementById('signupForm');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    const strengthFill = document.getElementById('strengthFill');
    const strengthText = document.getElementById('strengthText');
    const signupBtn = document.querySelector('.signup-btn');

    // Password toggle functionality
    document.querySelectorAll('.password-toggle').forEach(toggle => {
        toggle.addEventListener('click', function() {
            const input = this.parentElement.querySelector('input');
            const type = input.getAttribute('type') === 'password' ? 'text' : 'password';
            input.setAttribute('type', type);
            
            // Toggle eye icon
            const icon = this.querySelector('i');
            icon.classList.toggle('fa-eye');
            icon.classList.toggle('fa-eye-slash');
        });
    });

    // Password strength checker
    passwordInput.addEventListener('input', function() {
        const password = this.value;
        const strength = checkPasswordStrength(password);
        
        strengthFill.className = 'strength-fill ' + strength;
        strengthText.className = 'strength-text ' + strength;
        strengthText.textContent = strength.charAt(0).toUpperCase() + strength.slice(1);
    });

    // Confirm password validation
    confirmPasswordInput.addEventListener('input', function() {
        const password = passwordInput.value;
        const confirmPassword = this.value;
        
        if (confirmPassword && password !== confirmPassword) {
            this.style.borderColor = '#e74c3c';
            this.parentElement.querySelector('i').style.color = '#e74c3c';
        } else {
            this.style.borderColor = password ? '#1db954' : '#e9ecef';
            this.parentElement.querySelector('i').style.color = password ? '#1db954' : '#666';
        }
    });

    // Form submission
    signupForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = {
            firstName: document.getElementById('firstName').value,
            lastName: document.getElementById('lastName').value,
            email: document.getElementById('email').value,
            password: passwordInput.value,
            confirmPassword: confirmPasswordInput.value,
            username: document.getElementById('username').value,
            newsletter: document.getElementById('newsletter').checked,
            terms: document.getElementById('terms').checked
        };
        
        // Validation
        const errors = validateForm(formData);
        
        if (errors.length > 0) {
            showError(errors[0]);
            return;
        }
        
        // Show loading state
        setLoadingState(true);
        
        // Simulate API call
        setTimeout(() => {
            setLoadingState(false);
            
            // For demo purposes - always succeed
            showSuccess('Account created successfully! Redirecting to login...');
            
            // In real app, you would redirect here
            setTimeout(() => {
                window.location.href = 'login.html';
            }, 2000);
            
        }, 3000);
    });

    // Social signup buttons
    document.querySelectorAll('.social-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const provider = this.classList.contains('google-btn') ? 'Google' : 'GitHub';
            showMessage(`Connecting with ${provider}...`);
            
            // Simulate social signup
            setTimeout(() => {
                showSuccess(`Account created with ${provider}!`);
                setTimeout(() => {
                    window.location.href = 'login.html';
                }, 1500);
            }, 2000);
        });
    });

    // Utility functions
    function checkPasswordStrength(password) {
        let strength = 0;
        
        if (password.length >= 8) strength++;
        if (password.match(/[a-z]+/)) strength++;
        if (password.match(/[A-Z]+/)) strength++;
        if (password.match(/[0-9]+/)) strength++;
        if (password.match(/[!@#$%^&*(),.?":{}|<>]+/)) strength++;
        
        if (strength < 2) return 'weak';
        if (strength < 4) return 'fair';
        if (strength < 5) return 'good';
        return 'strong';
    }

    function validateForm(data) {
        const errors = [];
        
        if (!data.firstName || !data.lastName) {
            errors.push('Please enter your full name');
        }
        
        if (!data.email || !isValidEmail(data.email)) {
            errors.push('Please enter a valid email address');
        }
        
        if (!data.password) {
            errors.push('Please create a password');
        } else if (data.password.length < 8) {
            errors.push('Password must be at least 8 characters long');
        }
        
        if (data.password !== data.confirmPassword) {
            errors.push('Passwords do not match');
        }
        
        if (!data.username) {
            errors.push('Please choose a username');
        }
        
        if (!data.terms) {
            errors.push('Please accept the Terms of Service and Privacy Policy');
        }
        
        return errors;
    }

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function setLoadingState(loading) {
        if (loading) {
            signupBtn.classList.add('loading');
            signupBtn.disabled = true;
        } else {
            signupBtn.classList.remove('loading');
            signupBtn.disabled = false;
        }
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

    // Add focused class styles
    const focusStyle = document.createElement('style');
    focusStyle.textContent = `
        .input-group.focused i {
            color: #1db954;
        }
    `;
    document.head.appendChild(focusStyle);
});