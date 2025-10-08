// Carousel functionality
class Carousel {
  constructor() {
    this.slides = document.querySelectorAll(".carousel-slide")
    this.dots = document.querySelectorAll(".dot")
    this.prevBtn = document.querySelector(".carousel-arrow.prev")
    this.nextBtn = document.querySelector(".carousel-arrow.next")
    this.currentSlide = 0
    this.autoPlayInterval = null
    this.autoPlayDelay = 4000
    this.pauseDelay = 8000

    this.init()
  }

  init() {
    // Add event listeners for navigation arrows
    this.prevBtn.addEventListener("click", () => this.prevSlide())
    this.nextBtn.addEventListener("click", () => this.nextSlide())

    // Add event listeners for dots
    this.dots.forEach((dot, index) => {
      dot.addEventListener("click", () => this.goToSlide(index))
    })

    // Start auto-play
    this.startAutoPlay()

    // Pause auto-play on hover
    const container = document.querySelector(".carousel-container")
    container.addEventListener("mouseenter", () => this.stopAutoPlay())
    container.addEventListener("mouseleave", () => this.startAutoPlay())
  }

  goToSlide(index) {
    // Remove active class from current slide and dot
    this.slides[this.currentSlide].classList.remove("active")
    this.dots[this.currentSlide].classList.remove("active")

    // Update current slide
    this.currentSlide = index

    // Add active class to new slide and dot
    this.slides[this.currentSlide].classList.add("active")
    this.dots[this.currentSlide].classList.add("active")

    // Reset auto-play when manually navigating
    this.resetAutoPlay()
  }

  nextSlide() {
    const nextIndex = (this.currentSlide + 1) % this.slides.length
    this.goToSlide(nextIndex)
  }

  prevSlide() {
    const prevIndex = (this.currentSlide - 1 + this.slides.length) % this.slides.length
    this.goToSlide(prevIndex)
  }

  startAutoPlay() {
    this.stopAutoPlay()
    this.autoPlayInterval = setInterval(() => {
      this.nextSlide()
    }, this.autoPlayDelay)
  }

  stopAutoPlay() {
    if (this.autoPlayInterval) {
      clearInterval(this.autoPlayInterval)
      this.autoPlayInterval = null
    }
  }

  resetAutoPlay() {
    this.stopAutoPlay()
    setTimeout(() => {
      this.startAutoPlay()
    }, this.pauseDelay)
  }
}

// Initialize carousel when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  new Carousel()
})





// Products Page functionality
document.addEventListener('DOMContentLoaded', function() {
    // Product filtering
    const filterButtons = document.querySelectorAll('.filter-btn');
    const productCards = document.querySelectorAll('.product-card');
    const sortSelect = document.querySelector('.sort-select');
    const productsGrid = document.getElementById('productsGrid');

    // Filter functionality
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            // Show/hide products based on filter
            productCards.forEach(card => {
                if (filterValue === 'all' || card.classList.contains(filterValue)) {
                    card.style.display = 'block';
                    card.style.animation = 'fadeIn 0.6s ease';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // Sort functionality
    sortSelect.addEventListener('change', function() {
        const sortValue = this.value;
        const products = Array.from(productCards);
        
        products.sort((a, b) => {
            const priceA = parseFloat(a.getAttribute('data-price'));
            const priceB = parseFloat(b.getAttribute('data-price'));
            
            switch(sortValue) {
                case 'price-low':
                    return priceA - priceB;
                case 'price-high':
                    return priceB - priceA;
                case 'popular':
                    // Simulate popularity based on random data
                    return Math.random() - 0.5;
                case 'newest':
                    // Simulate newness based on order in DOM
                    return 0;
                default:
                    return 0;
            }
        });
        
        // Reorder products in grid
        products.forEach(product => {
            productsGrid.appendChild(product);
        });
    });

    // Add to cart functionality
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const cartCount = document.querySelector('.cart-count');
    
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productCard = this.closest('.product-card');
            const productName = productCard.querySelector('.product-title').textContent;
            const productPrice = productCard.querySelector('.current-price').textContent;
            
            // Update cart count
            let currentCount = parseInt(cartCount.textContent);
            currentCount++;
            cartCount.textContent = currentCount;
            
            // Show success message
            showSuccess(`Added ${productName} to cart!`);
            
            // Add animation to button
            this.innerHTML = '<i class="fas fa-check"></i> Added!';
            this.style.background = '#27ae60';
            
            setTimeout(() => {
                this.innerHTML = '<i class="fas fa-shopping-cart"></i> Add to Cart';
                this.style.background = '';
            }, 2000);
        });
    });

    // Wishlist functionality
    const wishlistButtons = document.querySelectorAll('.wishlist');
    
    wishlistButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productCard = this.closest('.product-card');
            const productName = productCard.querySelector('.product-title').textContent;
            
            const icon = this.querySelector('i');
            if (icon.classList.contains('far')) {
                icon.classList.remove('far');
                icon.classList.add('fas');
                icon.style.color = '#e74c3c';
                showSuccess(`Added ${productName} to wishlist!`);
            } else {
                icon.classList.remove('fas');
                icon.classList.add('far');
                icon.style.color = '';
                showMessage(`Removed ${productName} from wishlist`, 'info');
            }
        });
    });

    // Compare functionality
    const compareButtons = document.querySelectorAll('.compare');
    let comparedProducts = [];
    
    compareButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productCard = this.closest('.product-card');
            const productName = productCard.querySelector('.product-title').textContent;
            
            if (!comparedProducts.includes(productName)) {
                if (comparedProducts.length >= 3) {
                    showError('You can compare up to 3 products at a time');
                    return;
                }
                
                comparedProducts.push(productName);
                this.style.background = '#3498db';
                this.style.color = 'white';
                showSuccess(`Added ${productName} to compare!`);
            } else {
                comparedProducts = comparedProducts.filter(name => name !== productName);
                this.style.background = '';
                this.style.color = '';
                showMessage(`Removed ${productName} from compare`, 'info');
            }
            
            updateCompareBadge();
        });
    });

    function updateCompareBadge() {
        // You could add a compare badge or modal here
        console.log('Compared products:', comparedProducts);
    }

    // Quick view functionality
    const quickViewButtons = document.querySelectorAll('.quick-view');
    const quickViewModal = document.getElementById('quickViewModal');
    const closeQuickView = document.getElementById('closeQuickView');
    const quickViewContent = document.getElementById('quickViewContent');

    quickViewButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productCard = this.closest('.product-card');
            const productData = getProductData(productCard);
            
            showQuickView(productData);
        });
    });

    closeQuickView.addEventListener('click', function() {
        quickViewModal.style.display = 'none';
    });

    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target === quickViewModal) {
            quickViewModal.style.display = 'none';
        }
    });

    function getProductData(productCard) {
        return {
            title: productCard.querySelector('.product-title').textContent,
            description: productCard.querySelector('.product-description').textContent,
            image: productCard.querySelector('.product-image img').src,
            price: productCard.querySelector('.current-price').textContent,
            originalPrice: productCard.querySelector('.original-price')?.textContent || '',
            discount: productCard.querySelector('.discount')?.textContent || '',
            features: Array.from(productCard.querySelectorAll('.feature')).map(f => f.textContent.trim()),
            specs: Array.from(productCard.querySelectorAll('.spec')).map(s => ({
                label: s.querySelector('.spec-label').textContent,
                value: s.querySelector('.spec-value').textContent
            }))
        };
    }

    function showQuickView(productData) {
        quickViewContent.innerHTML = `
            <div class="quick-view-content">
                <div class="quick-view-image">
                    <img src="${productData.image}" alt="${productData.title}">
                </div>
                <div class="quick-view-details">
                    <h3>${productData.title}</h3>
                    <p class="product-description">${productData.description}</p>
                    
                    <div class="price-section">
                        <span class="current-price">${productData.price}</span>
                        ${productData.originalPrice ? `<span class="original-price">${productData.originalPrice}</span>` : ''}
                        ${productData.discount ? `<span class="discount">${productData.discount}</span>` : ''}
                    </div>
                    
                    <div class="features-section">
                        <h4>Key Features</h4>
                        <div class="features-grid">
                            ${productData.features.map(feature => `
                                <span class="feature">${feature}</span>
                            `).join('')}
                        </div>
                    </div>
                    
                    <div class="specs-section">
                        <h4>Specifications</h4>
                        <div class="specs-list">
                            ${productData.specs.map(spec => `
                                <div class="spec">
                                    <span class="spec-label">${spec.label}</span>
                                    <span class="spec-value">${spec.value}</span>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                    
                    <div class="quick-view-actions">
                        <button class="btn btn-outline">
                            <i class="fas fa-info-circle"></i>
                            Full Details
                        </button>
                        <button class="btn btn-primary add-to-cart-quick">
                            <i class="fas fa-shopping-cart"></i>
                            Add to Cart - ${productData.price}
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        // Add event listener to quick view add to cart button
        const addToCartQuick = quickViewContent.querySelector('.add-to-cart-quick');
        addToCartQuick.addEventListener('click', function() {
            let currentCount = parseInt(cartCount.textContent);
            currentCount++;
            cartCount.textContent = currentCount;
            showSuccess(`Added ${productData.title} to cart!`);
            quickViewModal.style.display = 'none';
        });
        
        quickViewModal.style.display = 'block';
    }

    // Load more functionality
    const loadMoreBtn = document.getElementById('loadMore');
    let currentPage = 1;
    
    loadMoreBtn.addEventListener('click', function() {
        // Simulate loading more products
        this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
        this.disabled = true;
        
        setTimeout(() => {
            // In a real application, this would fetch from an API
            showMessage('More products loaded!', 'info');
            this.innerHTML = '<i class="fas fa-redo"></i> Load More Products';
            this.disabled = false;
            currentPage++;
            
            if (currentPage >= 3) {
                this.style.display = 'none';
            }
        }, 1500);
    });

    // Search functionality (simplified)
    const searchIcon = document.querySelector('.fa-search').closest('.nav-icon');
    searchIcon.addEventListener('click', function(e) {
        e.preventDefault();
        const searchTerm = prompt('Enter product name to search:');
        if (searchTerm) {
            filterProductsBySearch(searchTerm);
        }
    });

    function filterProductsBySearch(searchTerm) {
        const searchLower = searchTerm.toLowerCase();
        
        productCards.forEach(card => {
            const title = card.querySelector('.product-title').textContent.toLowerCase();
            const description = card.querySelector('.product-description').textContent.toLowerCase();
            
            if (title.includes(searchLower) || description.includes(searchLower)) {
                card.style.display = 'block';
                card.style.animation = 'fadeIn 0.6s ease';
            } else {
                card.style.display = 'none';
            }
        });
        
        showMessage(`Showing results for: ${searchTerm}`, 'info');
    }

    // Utility functions
    function showSuccess(message) {
        showMessage(message, 'success');
    }

    function showError(message) {
        showMessage(message, 'error');
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
        
        .quick-view-content {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 30px;
        }
        
        .quick-view-image img {
            width: 100%;
            border-radius: 10px;
        }
        
        .quick-view-details h3 {
            font-size: 1.5rem;
            margin-bottom: 15px;
            color: #1a1a1a;
        }
        
        .price-section {
            display: flex;
            align-items: center;
            gap: 15px;
            margin: 20px 0;
            flex-wrap: wrap;
        }
        
        .features-grid {
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
            margin: 15px 0;
        }
        
        .specs-list {
            display: flex;
            flex-direction: column;
            gap: 10px;
            margin: 15px 0;
        }
        
        .spec {
            display: flex;
            justify-content: space-between;
            padding: 8px 0;
            border-bottom: 1px solid #f0f0f0;
        }
        
        .quick-view-actions {
            display: flex;
            gap: 15px;
            margin-top: 25px;
        }
        
        @media (max-width: 768px) {
            .quick-view-content {
                grid-template-columns: 1fr;
            }
            
            .quick-view-actions {
                flex-direction: column;
            }
        }
    `;
    document.head.appendChild(style);

    // Initialize product animations
    productCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });
});