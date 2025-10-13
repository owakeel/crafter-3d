// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize cart functionality
    initCart();
    
    // Initialize recommended products
    initRecommendedProducts();
});

// Cart functionality
function initCart() {
    // Quantity buttons
    const minusButtons = document.querySelectorAll('.minus-btn');
    const plusButtons = document.querySelectorAll('.plus-btn');
    const quantityInputs = document.querySelectorAll('.quantity-input');
    const removeButtons = document.querySelectorAll('.remove-btn');
    const cartCount = document.querySelector('.cart-count');
    
    // Update quantity
    function updateQuantity(input, change) {
        let currentValue = parseInt(input.value);
        let newValue = currentValue + change;
        
        if (newValue < 1) newValue = 1;
        
        input.value = newValue;
        updateCartTotal();
    }
    
    // Add event listeners to minus buttons
    minusButtons.forEach(button => {
        button.addEventListener('click', function() {
            const input = this.parentNode.querySelector('.quantity-input');
            updateQuantity(input, -1);
        });
    });
    
    // Add event listeners to plus buttons
    plusButtons.forEach(button => {
        button.addEventListener('click', function() {
            const input = this.parentNode.querySelector('.quantity-input');
            updateQuantity(input, 1);
        });
    });
    
    // Add event listeners to remove buttons
    removeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const cartItem = this.closest('.cart-item');
            cartItem.style.animation = 'fadeOut 0.3s ease';
            
            setTimeout(() => {
                cartItem.remove();
                updateCartTotal();
                updateCartCount();
            }, 300);
        });
    });
    
    // Update cart total
    function updateCartTotal() {
        let subtotal = 0;
        const cartItems = document.querySelectorAll('.cart-item');
        
        cartItems.forEach(item => {
            const priceText = item.querySelector('.price').textContent;
            const price = parseFloat(priceText.replace('$', ''));
            const quantity = parseInt(item.querySelector('.quantity-input').value);
            
            subtotal += price * quantity;
        });
        
        const shipping = 5.99;
        const tax = subtotal * 0.08; // 8% tax
        const total = subtotal + shipping + tax;
        
        // Update summary
        document.querySelector('.summary-row:nth-child(2) span:last-child').textContent = `$${subtotal.toFixed(2)}`;
        document.querySelector('.summary-row:nth-child(3) span:last-child').textContent = `$${shipping.toFixed(2)}`;
        document.querySelector('.summary-row:nth-child(4) span:last-child').textContent = `$${tax.toFixed(2)}`;
        document.querySelector('.summary-row.total span:last-child').textContent = `$${total.toFixed(2)}`;
    }
    
    // Update cart count
    function updateCartCount() {
        const cartItems = document.querySelectorAll('.cart-item');
        cartCount.textContent = cartItems.length;
    }
    
    // Checkout button
    const checkoutBtn = document.querySelector('.checkout-btn');
    checkoutBtn.addEventListener('click', function() {
        const cartItems = document.querySelectorAll('.cart-item');
        
        if (cartItems.length === 0) {
            alert('Your cart is empty!');
            return;
        }
        
        // Show loading animation
        this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
        this.disabled = true;
        
        // Simulate checkout process
        setTimeout(() => {
            alert('Order placed successfully! Thank you for shopping with Crafter-3D.');
            // Reset button
            this.innerHTML = 'Proceed to Checkout';
            this.disabled = false;
        }, 2000);
    });
    
    // Continue shopping button
    const continueBtn = document.querySelector('.continue-shopping-btn');
    continueBtn.addEventListener('click', function() {
        window.location.href = '#'; // Replace with actual products page URL
    });
    
    // Promo code
    const promoBtn = document.querySelector('.promo-input button');
    promoBtn.addEventListener('click', function() {
        const promoInput = document.querySelector('.promo-input input');
        const code = promoInput.value.trim().toUpperCase();
        
        if (code === 'CRAFTER10') {
            alert('Promo code applied! You got 10% off.');
            // Apply discount logic would go here
            promoInput.value = '';
        } else if (code) {
            alert('Invalid promo code. Please try again.');
        } else {
            alert('Please enter a promo code.');
        }
    });
}

// Mobile menu functionality


// Recommended products functionality
function initRecommendedProducts() {
    const addToCartBtns = document.querySelectorAll('.add-to-cart-btn');
    
    addToCartBtns.forEach(button => {
        button.addEventListener('click', function() {
            const productCard = this.closest('.product-card');
            const productName = productCard.querySelector('h4').textContent;
            const productPrice = productCard.querySelector('.product-price').textContent;
            
            // Show added to cart feedback
            const originalText = this.textContent;
            this.textContent = 'Added to Cart!';
            this.style.background = 'var(--success)';
            this.style.color = 'white';
            
            setTimeout(() => {
                this.textContent = originalText;
                this.style.background = '';
                this.style.color = '';
            }, 2000);
            
            // In a real application, you would add the product to the cart
            console.log(`Added ${productName} to cart for ${productPrice}`);
            
            // Update cart count
            const cartCount = document.querySelector('.cart-count');
            cartCount.textContent = parseInt(cartCount.textContent) + 1;
        });
    });
}

// Add CSS animation for fadeOut
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeOut {
        from { opacity: 1; transform: translateY(0); }
        to { opacity: 0; transform: translateY(-20px); }
    }
`;
document.head.appendChild(style);