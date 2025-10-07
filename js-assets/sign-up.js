// ==================== Sign Up Page Functionality ====================
// This JS file handles password visibility toggle, form validation,
// password strength checking, fake submit loading state, and alert messages.

document.addEventListener('DOMContentLoaded', function() {

    // ------------- Form & Element References -------------
    const signupForm = document.getElementById('signupForm');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    const strengthFill = document.getElementById('strengthFill');
    const strengthText = document.getElementById('strengthText');
    const signupBtn = document.querySelector('.signup-btn');

    // ------------- Password Toggle (Show / Hide) -------------
    // Allows user to show or hide password fields for convenience.
    document.querySelectorAll('.password-toggle').forEach(toggle => {
        toggle.addEventListener('click', function() {
            const input = this.parentElement.querySelector('input');
            const type = input.getAttribute('type') === 'password' ? 'text' : 'password';
            input.setAttribute('type', type);

            // Toggle the eye icon between open/closed
            const icon = this.querySelector('i');
            icon.classList.toggle('fa-eye');
            icon.classList.toggle('fa-eye-slash');
        });
    });

    // ------------- Password Strength Checker -------------
    // Dynamically shows password strength (weak, fair, good, strong)
    passwordInput.addEventListener('input', function() {
        const password = this.value;
        const strength = checkPasswordStrength(password);

        strengthFill.className = 'strength-fill ' + strength;
        strengthText.className = 'strength-text ' + strength;
        strengthText.textContent = strength.charAt(0).toUpperCase() + strength.slice(1);
    });

    // ------------- Confirm Password Validation -------------
    // Highlights the confirm password input red/green based on match
    confirmPasswordInput.addEventListener('input', function() {
        const password = passwordInput.value;
        const confirmPassword = this.value;

        if (confirmPassword && password !== confirmPassword) {
            this.style.borderColor = '#e74c3c'; // red
            this.parentElement.querySelector('i').style.color = '#e74c3c';
        } else {
            this.style.borderColor = password ? '#1db954' : '#e9ecef'; // green or default
            this.parentElement.querySelector('i').style.color = password ? '#1db954' : '#666';
        }
    });

    // ------------- Form Submission Handler -------------
    // Prevents default behavior and simulates an API call
    signupForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Collect form data
        const formData = {
            firstName: document.getElementById('firstName').value,
            lastName: document.getElementById('lastName').value,
            email: document.getElementById('email').value,
            password: passwordInput.value,
            confirmPassword: confirmPasswordInput.value,
            username: document.getElementById('username').value,
            // Optional fields (uncomment if exists)
            // newsletter: document.getElementById('newsletter').checked,
            terms: document.getElementById('terms').checked
        };

        // Validate input fields before submission
        const errors = validateForm(formData);

        if (errors.length > 0) {
            showError(errors[0]); // show first error
            return;
        }

        // Show loading spinner on the submit button
        setLoadingState(true);

        // ---------- LARAVEL INTEGRATION ----------
        // Replace this simulated API call with actual Laravel AJAX request:
        /*
        fetch("{{ route('register') }}", {
            method: "POST",
            headers: {
                "X-CSRF-TOKEN": document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData)
        })
        .then(response => response.json())
        .then(data => {
            setLoadingState(false);
            if (data.success) {
                showSuccess('Account created successfully!');
                window.location.href = "{{ route('login') }}";
            } else {
                showError(data.message || 'Registration failed');
            }
        })
        .catch(() => {
            setLoadingState(false);
            showError('Something went wrong. Please try again.');
        });
        */

        // Simulated API delay (for demo only)
        setTimeout(() => {
            setLoadingState(false);
            showSuccess('Account created successfully! Redirecting to login...');
            setTimeout(() => {
                window.location.href = 'login.html'; // In Laravel: route('login')
            }, 2000);
        }, 3000);
    });

    // ------------- Social Signup Buttons -------------
    // Handles simulated OAuth signup with Google/GitHub
    document.querySelectorAll('.social-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const provider = this.classList.contains('google-btn') ? 'Google' : 'GitHub';
            showMessage(`Connecting with ${provider}...`);

            // ---------- LARAVEL INTEGRATION ----------
            // Replace with redirect to Socialite route:
            // window.location.href = `/auth/${provider.toLowerCase()}/redirect`;

            setTimeout(() => {
                showSuccess(`Account created with ${provider}!`);
                setTimeout(() => {
                    window.location.href = 'login.html';
                }, 1500);
            }, 2000);
        });
    });

    // ------------- Utility Functions -------------

    // Check password strength (basic algorithm)
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

    // Client-side validation logic
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

    // Email format validation
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Button loading state
    function setLoadingState(loading) {
        if (loading) {
            signupBtn.classList.add('loading');
            signupBtn.disabled = true;
        } else {
            signupBtn.classList.remove('loading');
            signupBtn.disabled = false;
        }
    }

    // Message utilities
    function showError(message) { showMessage(message, 'error'); }
    function showSuccess(message) { showMessage(message, 'success'); }

    // Show custom message popup (top-right notification)
    function showMessage(message, type = 'info') {
        const existingMessage = document.querySelector('.message');
        if (existingMessage) existingMessage.remove();

        const messageEl = document.createElement('div');
        messageEl.className = `message message-${type}`;
        messageEl.textContent = message;

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

        // Dynamic background color based on type
        if (type === 'error') messageEl.style.background = '#e74c3c';
        else if (type === 'success') messageEl.style.background = '#1db954';
        else messageEl.style.background = '#3498db';

        document.body.appendChild(messageEl);

        // Auto hide after 5 seconds
        setTimeout(() => {
            if (messageEl.parentNode) {
                messageEl.style.animation = 'slideOutRight 0.3s ease';
                setTimeout(() => messageEl.remove(), 300);
            }
        }, 5000);
    }

    // ------------- Animation CSS Injection -------------
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOutRight {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
        .message { box-shadow: 0 5px 15px rgba(0,0,0,0.2); }
    `;
    document.head.appendChild(style);

    // ------------- Input Focus Effects -------------
    document.querySelectorAll('input').forEach(input => {
        input.addEventListener('focus', () => input.parentElement.classList.add('focused'));
        input.addEventListener('blur', () => input.parentElement.classList.remove('focused'));
    });

    // Inject CSS for focused input icons
    const focusStyle = document.createElement('style');
    focusStyle.textContent = `
        .input-group.focused i { color: #1db954; }
    `;
    document.head.appendChild(focusStyle);
});
