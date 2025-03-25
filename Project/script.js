// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Mobile menu toggle
const createMobileMenu = () => {
    const nav = document.querySelector('.nav-links');
    const burger = document.createElement('div');
    burger.className = 'burger';
    burger.innerHTML = `
        <div class="line1"></div>
        <div class="line2"></div>
        <div class="line3"></div>
    `;
    document.querySelector('.nav-container').appendChild(burger);

    burger.addEventListener('click', () => {
        nav.classList.toggle('nav-active');
        burger.classList.toggle('toggle');
    });
};

// Recipe search functionality
const setupSearch = () => {
    const searchBox = document.createElement('div');
    searchBox.className = 'search-box';
    searchBox.innerHTML = `
        <input type="text" placeholder="Search recipes..." class="search-input">
        <button class="search-button">Search</button>
    `;
    document.querySelector('.hero-content').insertBefore(searchBox, document.querySelector('.cta-button'));
};

// Recipe filter functionality
const setupFilters = () => {
    const recipes = document.querySelectorAll('.recipe-card');
    const categories = document.querySelectorAll('.category-card');

    categories.forEach(category => {
        category.addEventListener('click', () => {
            const filterValue = category.textContent.toLowerCase();
            
            // Add active state to clicked category
            categories.forEach(c => c.classList.remove('active'));
            category.classList.add('active');

            // Simple filter animation
            recipes.forEach(recipe => {
                recipe.style.opacity = '0';
                setTimeout(() => {
                    recipe.style.opacity = '1';
                }, 300);
            });
        });
    });
};

// Newsletter subscription
const setupNewsletter = () => {
    const newsletter = document.createElement('div');
    newsletter.className = 'newsletter';
    newsletter.innerHTML = `
        <h3>Subscribe to Our Newsletter</h3>
        <div class="newsletter-form">
            <input type="email" placeholder="Enter your email">
            <button>Subscribe</button>
        </div>
    `;
    document.querySelector('.footer').insertBefore(newsletter, document.querySelector('.footer p'));

    const subscribeButton = newsletter.querySelector('button');
    const emailInput = newsletter.querySelector('input');

    subscribeButton.addEventListener('click', () => {
        const email = emailInput.value;
        if (validateEmail(email)) {
            showNotification('Thank you for subscribing!');
            emailInput.value = '';
        } else {
            showNotification('Please enter a valid email address.', 'error');
        }
    });
};

// Helper function to validate email
const validateEmail = (email) => {
    return email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
};

// Show notification
const showNotification = (message, type = 'success') => {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.classList.add('show');
    }, 100);

    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
};

// Initialize all features when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    createMobileMenu();
    setupSearch();
    setupFilters();
    setupNewsletter();
});