// Personal Information Page functionality
document.addEventListener('DOMContentLoaded', function() {
    // Navigation between sections
    const navItems = document.querySelectorAll('.nav-item');
    const infoSections = document.querySelectorAll('.info-section');

    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all items
            navItems.forEach(nav => nav.classList.remove('active'));
            
            // Add active class to clicked item
            this.classList.add('active');
            
            // Hide all sections
            infoSections.forEach(section => section.classList.remove('active'));
            
            // Show target section
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.classList.add('active');
            }
        });
    });

    // Avatar functionality
    const avatarPreview = document.querySelector('.avatar-preview');
    const changeAvatarBtn = document.getElementById('changeAvatar');
    const removeAvatarBtn = document.getElementById('removeAvatar');

    function changeAvatar() {
        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.accept = 'image/*';
        
        fileInput.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file) {
                // Validate file type and size
                if (!file.type.startsWith('image/')) {
                    showError('Please select a valid image file');
                    return;
                }
                
                if (file.size > 5 * 1024 * 1024) { // 5MB limit
                    showError('Image size must be less than 5MB');
                    return;
                }
                
                const reader = new FileReader();
                reader.onload = function(e) {
                    const avatarImage = document.querySelector('.avatar-image');
                    avatarImage.src = e.target.result;
                    showSuccess('Profile picture updated successfully!');
                    
                    // Laravel Integration: Send AJAX request to upload image to server
                    // Example: 
                    // const formData = new FormData();
                    // formData.append('avatar', file);
                    // formData.append('_token', '{{ csrf_token() }}');
                    // fetch('/profile/update-avatar', { 
                    //     method: 'POST', 
                    //     body: formData 
                    // })
                    // .then(response => response.json())
                    // .then(data => {
                    //     if(data.success) {
                    //         showSuccess('Avatar updated successfully!');
                    //     }
                    // })
                    // .catch(error => console.error('Error:', error));
                };
                reader.readAsDataURL(file);
            }
        });
        
        fileInput.click();
    }

    avatarPreview.addEventListener('click', changeAvatar);
    changeAvatarBtn.addEventListener('click', changeAvatar);

    removeAvatarBtn.addEventListener('click', function() {
        const avatarImage = document.querySelector('.avatar-image');
        avatarImage.src = 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80';
        showSuccess('Profile picture removed!');
        
        // Laravel Integration: Send AJAX request to remove avatar from server
        // Example: 
        // fetch('/profile/remove-avatar', { 
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //         'X-CSRF-TOKEN': '{{ csrf_token() }}'
        //     }
        // })
        // .then(response => response.json())
        // .then(data => {
        //     if(data.success) {
        //         showSuccess('Avatar removed successfully!');
        //     }
        // })
        // .catch(error => console.error('Error:', error));
    });

    // Bio character counter
    const bioTextarea = document.getElementById('bio');
    const bioCharCount = document.getElementById('bioCharCount');
    
    if (bioTextarea && bioCharCount) {
        bioTextarea.addEventListener('input', function() {
            const count = this.value.length;
            bioCharCount.textContent = count;
            
            if (count > 450) {
                bioCharCount.style.color = '#e74c3c';
            } else if (count > 400) {
                bioCharCount.style.color = '#f39c12';
            } else {
                bioCharCount.style.color = '#666';
            }
        });
    }

    // Social links management
    const addSocialLinkBtn = document.querySelector('.add-social-link');
    const socialLinksContainer = document.querySelector('.social-links-input');
    
    function createSocialLinkItem() {
        const socialLinkItem = document.createElement('div');
        socialLinkItem.className = 'social-link-item';
        socialLinkItem.innerHTML = `
            <select class="social-platform">
                <option value="github">GitHub</option>
                <option value="twitter">Twitter</option>
                <option value="instagram">Instagram</option>
                <option value="linkedin">LinkedIn</option>
                <option value="youtube">YouTube</option>
            </select>
            <input type="text" placeholder="username" class="social-username">
            <button type="button" class="btn-icon remove-social">
                <i class="fas fa-times"></i>
            </button>
        `;
        
        // Add remove functionality
        const removeBtn = socialLinkItem.querySelector('.remove-social');
        removeBtn.addEventListener('click', function() {
            socialLinkItem.remove();
        });
        
        return socialLinkItem;
    }
    
    addSocialLinkBtn.addEventListener('click', function() {
        const newSocialLink = createSocialLinkItem();
        socialLinksContainer.insertBefore(newSocialLink, addSocialLinkBtn);
    });

    // Form submission - Main Laravel Integration Point
    const personalForm = document.getElementById('personalForm');
    
    personalForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validate form
        const errors = validatePersonalForm();
        
        if (errors.length > 0) {
            showError(errors[0]);
            return;
        }
        
        // Show loading state
        const saveBtn = document.getElementById('saveChanges');
        const originalText = saveBtn.innerHTML;
        saveBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Saving...';
        saveBtn.disabled = true;
        
        // Laravel Integration: Send form data to server via AJAX
        // Example implementation:
        // const formData = new FormData(personalForm);
        
        // // Collect social links data
        // const socialLinks = [];
        // document.querySelectorAll('.social-link-item').forEach(item => {
        //     const platform = item.querySelector('.social-platform').value;
        //     const username = item.querySelector('.social-username').value;
        //     if (username.trim()) {
        //         socialLinks.push({ platform, username });
        //     }
        // });
        
        // formData.append('social_links', JSON.stringify(socialLinks));
        
        // fetch('/profile/update', {
        //     method: 'POST',
        //     body: formData,
        //     headers: {
        //         'X-CSRF-TOKEN': '{{ csrf_token() }}'
        //     }
        // })
        // .then(response => response.json())
        // .then(data => {
        //     if (data.success) {
        //         showSuccess('Profile updated successfully!');
        //     } else {
        //         showError(data.message || 'Error updating profile');
        //     }
        // })
        // .catch(error => {
        //     showError('Network error occurred');
        // })
        // .finally(() => {
        //     saveBtn.innerHTML = originalText;
        //     saveBtn.disabled = false;
        // });

        // Simulate API call (remove this in actual implementation)
        setTimeout(() => {
            saveBtn.innerHTML = originalText;
            saveBtn.disabled = false;
            showSuccess('Profile updated successfully!');
        }, 2000);
    });

    // Cancel changes
    const cancelBtn = document.getElementById('cancelChanges');
    cancelBtn.addEventListener('click', function() {
        if (confirm('Are you sure you want to discard your changes?')) {
            personalForm.reset();
            showMessage('Changes discarded', 'info');
            
            // Laravel Integration: Optionally reload data from server
            // window.location.reload(); // or fetch current data
        }
    });

    // Change email - Laravel Integration
    const changeEmailBtn = document.getElementById('changeEmail');
    changeEmailBtn.addEventListener('click', function() {
        showMessage('Email change functionality would open here', 'info');
        
        // Laravel Integration: Open email change modal or redirect
        // Example: window.location.href = '/profile/change-email';
    });

    // Verify phone - Laravel Integration
    const verifyPhoneBtn = document.getElementById('verifyPhone');
    verifyPhoneBtn.addEventListener('click', function() {
        showMessage('Phone verification process would start here', 'info');
        
        // Laravel Integration: Initiate phone verification process
        // Example: 
        // fetch('/profile/send-phone-verification', {
        //     method: 'POST',
        //     headers: {
        //         'X-CSRF-TOKEN': '{{ csrf_token() }}'
        //     }
        // })
        // .then(response => response.json())
        // .then(data => {
        //     if(data.success) {
        //         // Show verification code input modal
        //         showVerificationModal();
        //     }
        // });
    });

    // Password modal functionality - Laravel Integration
    const changePasswordBtn = document.getElementById('changePassword');
    const passwordModal = document.getElementById('passwordModal');
    const closePasswordModal = document.getElementById('closePasswordModal');
    const cancelPasswordBtn = document.getElementById('cancelPassword');
    const passwordForm = document.getElementById('passwordForm');

    changePasswordBtn.addEventListener('click', function() {
        passwordModal.style.display = 'block';
    });

    closePasswordModal.addEventListener('click', function() {
        passwordModal.style.display = 'none';
    });

    cancelPasswordBtn.addEventListener('click', function() {
        passwordModal.style.display = 'none';
    });

    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target === passwordModal) {
            passwordModal.style.display = 'none';
        }
    });

    // Password strength checker
    const newPasswordInput = document.getElementById('newPassword');
    const strengthFill = document.getElementById('strengthFill');
    const strengthText = document.getElementById('strengthText');

    if (newPasswordInput && strengthFill && strengthText) {
        newPasswordInput.addEventListener('input', function() {
            const password = this.value;
            const strength = checkPasswordStrength(password);
            
            strengthFill.className = 'strength-fill ' + strength;
            strengthText.className = 'strength-text ' + strength;
            strengthText.textContent = strength.charAt(0).toUpperCase() + strength.slice(1);
        });
    }

    // Password form submission - Laravel Integration
    passwordForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const currentPassword = document.getElementById('currentPassword').value;
        const newPassword = document.getElementById('newPassword').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        
        // Validate passwords
        if (newPassword !== confirmPassword) {
            showError('New passwords do not match');
            return;
        }
        
        if (newPassword.length < 8) {
            showError('Password must be at least 8 characters long');
            return;
        }
        
        // Laravel Integration: Send password change request to server
        // Example:
        // const formData = new FormData(passwordForm);
        // fetch('/profile/change-password', {
        //     method: 'POST',
        //     body: formData,
        //     headers: {
        //         'X-CSRF-TOKEN': '{{ csrf_token() }}'
        //     }
        // })
        // .then(response => response.json())
        // .then(data => {
        //     if (data.success) {
        //         passwordModal.style.display = 'none';
        //         passwordForm.reset();
        //         showSuccess('Password updated successfully!');
        //     } else {
        //         showError(data.message || 'Error changing password');
        //     }
        // })
        // .catch(error => {
        //     showError('Network error occurred');
        // });

        // Simulate password change (remove this in actual implementation)
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Updating...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            passwordModal.style.display = 'none';
            passwordForm.reset();
            showSuccess('Password updated successfully!');
        }, 2000);
    });

    // Enable 2FA - Laravel Integration
    const enable2FABtn = document.getElementById('enable2FA');
    enable2FABtn.addEventListener('click', function() {
        showMessage('Two-factor authentication setup would start here', 'info');
        
        // Laravel Integration: Initiate 2FA setup process
        // Example: window.location.href = '/profile/two-factor-authentication';
    });

    // Delete account - Laravel Integration
    const deleteAccountBtn = document.getElementById('deleteAccount');
    deleteAccountBtn.addEventListener('click', function() {
        if (confirm('Are you sure you want to delete your account? This action cannot be undone and all your data will be permanently lost.')) {
            showMessage('Account deletion process would start here', 'warning');
            
            // Laravel Integration: Send account deletion request
            // Example:
            // fetch('/profile/delete-account', {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json',
            //         'X-CSRF-TOKEN': '{{ csrf_token() }}'
            //     }
            // })
            // .then(response => response.json())
            // .then(data => {
            //     if(data.success) {
            //         window.location.href = '/goodbye';
            //     }
            // });
        }
    });

    // Utility functions
    function validatePersonalForm() {
        const errors = [];
        const formData = new FormData(personalForm);
        
        // Required fields validation
        const requiredFields = ['firstName', 'lastName', 'username', 'email'];
        
        requiredFields.forEach(field => {
            const input = document.getElementById(field);
            if (!input.value.trim()) {
                errors.push(`${field.replace(/([A-Z])/g, ' $1').toLowerCase()} is required`);
            }
        });
        
        // Email validation
        const email = document.getElementById('email').value;
        if (email && !isValidEmail(email)) {
            errors.push('Please enter a valid email address');
        }
        
        // Username validation
        const username = document.getElementById('username').value;
        if (username && !isValidUsername(username)) {
            errors.push('Username can only contain letters, numbers, and underscores');
        }
        
        return errors;
    }

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

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function isValidUsername(username) {
        const usernameRegex = /^[a-zA-Z0-9_]+$/;
        return usernameRegex.test(username);
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
            top: 90px;
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
        } else if (type === 'warning') {
            messageEl.style.background = '#f39c12';
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

    // Initialize form with current values - Laravel Integration
    function initializeForm() {
        // Laravel Integration: Fetch current user data from server
        // Example:
        // fetch('/profile/get-data')
        // .then(response => response.json())
        // .then(data => {
        //     // Populate form fields with user data
        //     document.getElementById('firstName').value = data.first_name || '';
        //     document.getElementById('lastName').value = data.last_name || '';
        //     document.getElementById('username').value = data.username || '';
        //     document.getElementById('email').value = data.email || '';
        //     document.getElementById('phone').value = data.phone || '';
        //     document.getElementById('bio').value = data.bio || '';
        //     
        //     // Populate social links
        //     if (data.social_links) {
        //         data.social_links.forEach(link => {
        //             const newSocialLink = createSocialLinkItem();
        //             newSocialLink.querySelector('.social-platform').value = link.platform;
        //             newSocialLink.querySelector('.social-username').value = link.username;
        //             socialLinksContainer.insertBefore(newSocialLink, addSocialLinkBtn);
        //         });
        //     }
        // })
        // .catch(error => console.error('Error fetching user data:', error));

        console.log('Initializing form with user data...');
    }

    initializeForm();
});