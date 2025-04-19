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
    let lastScrollY = window.scrollY;
    
    // Add the visible class by default
    navbar.classList.add('navbar-visible');
    
    window.addEventListener('scroll', function() {
        const currentScrollY = window.scrollY;
        
        // Determine scroll direction
        if (currentScrollY > lastScrollY) {
            // Scrolling down - hide navbar
            navbar.classList.remove('navbar-visible');
            navbar.classList.add('navbar-hidden');
        } else {
            // Scrolling up - show navbar
            navbar.classList.remove('navbar-hidden');
            navbar.classList.add('navbar-visible');
        }
        
        lastScrollY = currentScrollY;
    });
}); 