document.addEventListener('DOMContentLoaded', function() {
    // Get all FAQ cards
    const faqCards = document.querySelectorAll('.faqCard');
    
    // Add click event listeners to each card
    faqCards.forEach(card => {
        const question = card.querySelector('.faqQuestion');
        
        question.addEventListener('click', function() {
            // Check if the current card is already active
            const isActive = card.classList.contains('active');
            
            // Close all FAQ cards
            faqCards.forEach(c => {
                c.classList.remove('active');
            });
            
            // Toggle the current card if it wasn't active before
            if (!isActive) {
                card.classList.add('active');
            }
        });
    });
    
    // Carousel navigation functionality
    const carouselContainer = document.querySelector('.carouselCardConatiner');
    const prevButton = document.querySelector('.carousel-prev');
    const nextButton = document.querySelector('.carousel-next');
    
    if (carouselContainer && prevButton && nextButton) {
        let scrollAmount = 0;
        
        // Function to calculate the number of visible cards
        const calculateVisibleCards = () => {
            const containerWidth = carouselContainer.offsetWidth;
            const cardWidth = carouselContainer.querySelector('.carouselCard').offsetWidth;
            const gap = 30; // Updated to match the CSS gap
            return Math.floor(containerWidth / (cardWidth + gap));
        };
        
        // Function to update buttons visibility based on scroll position
        const updateButtonsVisibility = () => {
            if (scrollAmount <= 0) {
                prevButton.style.opacity = '0.5';
                prevButton.style.pointerEvents = 'none';
            } else {
                prevButton.style.opacity = '1';
                prevButton.style.pointerEvents = 'auto';
            }
            
            const scrollWidth = carouselContainer.scrollWidth;
            const visibleWidth = carouselContainer.offsetWidth;
            const maxScroll = scrollWidth - visibleWidth;
            
            if (scrollAmount >= maxScroll - 10) { // Small tolerance for floating-point issues
                nextButton.style.opacity = '0.5';
                nextButton.style.pointerEvents = 'none';
            } else {
                nextButton.style.opacity = '1';
                nextButton.style.pointerEvents = 'auto';
            }
        };
        
        // Initial check
        updateButtonsVisibility();
        
        // Scroll to previous cards
        prevButton.addEventListener('click', () => {
            const cardWidth = carouselContainer.querySelector('.carouselCard').offsetWidth;
            const gap = 25; // Updated to match the CSS gap
            const visibleCards = calculateVisibleCards();
            
            // Scroll by the number of visible cards or at least 1
            const scrollBy = Math.max(1, visibleCards) * (cardWidth + gap);
            scrollAmount = Math.max(0, scrollAmount - scrollBy);
            
            carouselContainer.scrollTo({
                left: scrollAmount,
                behavior: 'smooth'
            });
            updateButtonsVisibility();
        });
        
        // Scroll to next cards
        nextButton.addEventListener('click', () => {
            const cardWidth = carouselContainer.querySelector('.carouselCard').offsetWidth;
            const gap = 25; // Updated to match the CSS gap
            const visibleCards = calculateVisibleCards();
            
            // Scroll by the number of visible cards or at least 1
            const scrollBy = Math.max(1, visibleCards) * (cardWidth + gap);
            
            const scrollWidth = carouselContainer.scrollWidth;
            const visibleWidth = carouselContainer.offsetWidth;
            const maxScroll = scrollWidth - visibleWidth;
            
            scrollAmount = Math.min(maxScroll, scrollAmount + scrollBy);
            
            carouselContainer.scrollTo({
                left: scrollAmount,
                behavior: 'smooth'
            });
            updateButtonsVisibility();
        });
        
        // Update on window resize
        window.addEventListener('resize', () => {
            const scrollWidth = carouselContainer.scrollWidth;
            const visibleWidth = carouselContainer.offsetWidth;
            const maxScroll = scrollWidth - visibleWidth;
            
            // Adjust current scroll position if it exceeds the new max
            if (scrollAmount > maxScroll) {
                scrollAmount = maxScroll;
                carouselContainer.scrollTo({
                    left: scrollAmount,
                    behavior: 'auto'
                });
            }
            
            updateButtonsVisibility();
        });
        
        // Listen for scroll events
        carouselContainer.addEventListener('scroll', () => {
            scrollAmount = carouselContainer.scrollLeft;
            updateButtonsVisibility();
        });
    }
    
    // Mobile menu functionality
    const menuToggle = document.querySelector('.mobileMenuToggle');
    const mobileMenu = document.querySelector('.mobileMenu');
    const menuIcon = document.querySelector('.menu-icon');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            // Toggle mobile menu
            mobileMenu.classList.toggle('active');
            
            // Toggle menu icon animation
            menuIcon.classList.toggle('open');
            
            if (menuIcon.classList.contains('open')) {
                menuIcon.querySelector('span:nth-child(1)').style.transform = 'rotate(45deg) translate(7px, 7px)';
                menuIcon.querySelector('span:nth-child(2)').style.opacity = '0';
                menuIcon.querySelector('span:nth-child(3)').style.transform = 'rotate(-45deg) translate(7px, -7px)';
            } else {
                menuIcon.querySelector('span:nth-child(1)').style.transform = 'none';
                menuIcon.querySelector('span:nth-child(2)').style.opacity = '1';
                menuIcon.querySelector('span:nth-child(3)').style.transform = 'none';
            }
        });
    }
    
    // Close mobile menu when a link is clicked
    const mobileMenuLinks = document.querySelectorAll('.mobileMenuListItems a');
    
    mobileMenuLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenu.classList.remove('active');
            
            // Reset menu icon
            if (menuIcon.classList.contains('open')) {
                menuIcon.classList.remove('open');
                menuIcon.querySelector('span:nth-child(1)').style.transform = 'none';
                menuIcon.querySelector('span:nth-child(2)').style.opacity = '1';
                menuIcon.querySelector('span:nth-child(3)').style.transform = 'none';
            }
        });
    });
    
    // Handle window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768 && mobileMenu.classList.contains('active')) {
            mobileMenu.classList.remove('active');
            
            // Reset menu icon
            if (menuIcon.classList.contains('open')) {
                menuIcon.classList.remove('open');
                menuIcon.querySelector('span:nth-child(1)').style.transform = 'none';
                menuIcon.querySelector('span:nth-child(2)').style.opacity = '1';
                menuIcon.querySelector('span:nth-child(3)').style.transform = 'none';
            }
        }
    });
    
    // Scroll-based navbar visibility
    const navbar = document.querySelector('.upperNavbarSection');

    // Add the visible class by default (when page loads)
    navbar.classList.add('navbar-visible');

    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;
        
        // Show navbar only when at the top of the page
        if (scrollPosition <= 10) {
            // At the top - show navbar
            navbar.classList.remove('navbar-hidden');
            navbar.classList.add('navbar-visible');
        } else {
            // Not at the top - hide navbar
            navbar.classList.remove('navbar-visible');
            navbar.classList.add('navbar-hidden');
        }
    });
}); 