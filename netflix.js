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
    
    // Scroll-based navbar visibility and transparency
    const upperNavbar = document.querySelector('.upperNavbarSection');
    const menuList = document.querySelector('.menuList');

    // Add the visible class by default (when page loads)
    upperNavbar.classList.add('navbar-visible');

    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;
        const scrollThreshold = 10;
        const transparencyThreshold = 100;
        const maxTransparency = 500;
        
        // Show upper navbar only when at the top of the page
        if (scrollPosition <= scrollThreshold) {
            // At the top - show navbar
            upperNavbar.classList.remove('navbar-hidden');
            upperNavbar.classList.add('navbar-visible');
        } else {
            // Not at the top - hide navbar
            upperNavbar.classList.remove('navbar-visible');
            upperNavbar.classList.add('navbar-hidden');
        }
        
        // Handle navbar transparency based on scroll position
        if (menuList) {
            if (scrollPosition <= transparencyThreshold) {
                // At the top - fully opaque
                menuList.classList.remove('navbar-transparent');
                menuList.style.opacity = 1;
            } else if (scrollPosition > maxTransparency) {
                // Past threshold - minimum opacity
                menuList.classList.add('navbar-transparent');
                menuList.style.opacity = 0.7;
            } else {
                // In between - gradual transparency
                const opacityRatio = 1 - ((scrollPosition - transparencyThreshold) / (maxTransparency - transparencyThreshold)) * 0.3;
                menuList.style.opacity = opacityRatio;
                
                if (scrollPosition > transparencyThreshold + 50) {
                    menuList.classList.add('navbar-transparent');
                } else {
                    menuList.classList.remove('navbar-transparent');
                }
            }
        }
    });
}); 