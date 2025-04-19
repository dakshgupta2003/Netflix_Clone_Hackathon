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
    
    // Movie search functionality
    const searchInput = document.getElementById('movieSearch');
    const searchButton = document.querySelector('.searchButton');
    const searchResults = document.getElementById('searchResults');
    
    // Sample movie data based on the carousel images
    const movies = [
        { id: 1, title: 'Pushpa 2', image: './c1.png', genre: 'Action/Drama' },
        { id: 2, title: 'Vidaamuyarchi', image: './c2.png', genre: 'Thriller' },
        { id: 3, title: 'Squid Game', image: './c3.png', genre: 'Drama/Thriller' },
        { id: 4, title: 'Thandel', image: './c4.png', genre: 'Action/Adventure' },
        { id: 5, title: 'Nadaaniyaan', image: './c5.png', genre: 'Romance' },
        { id: 6, title: 'Daaku Maharaaj', image: './c6.png', genre: 'Action/Crime' }
    ];
    
    // Function to perform search
    function performSearch() {
        const searchTerm = searchInput.value.toLowerCase().trim();
        const searchButton = document.querySelector('.searchButton');
        
        // Clear previous results
        searchResults.innerHTML = '';
        
        // Reset search button state
        searchButton.classList.remove('found');
        
        if (searchTerm === '') {
            searchResults.classList.remove('active');
            return;
        }
        
        // Filter movies by search term
        const filteredMovies = movies.filter(movie => 
            movie.title.toLowerCase().includes(searchTerm) ||
            movie.genre.toLowerCase().includes(searchTerm)
        );
        
        if (filteredMovies.length > 0) {
            // Movie found - show green tick
            searchButton.classList.add('found');
            
            // Display search results
            filteredMovies.forEach(movie => {
                const resultItem = document.createElement('div');
                resultItem.className = 'searchResultItem';
                resultItem.innerHTML = `
                    <img src="${movie.image}" alt="${movie.title}">
                    <div class="movieInfo">
                        <div class="movieTitle">${movie.title}</div>
                        <div class="movieGenre">${movie.genre}</div>
                    </div>
                `;
                
                // Add click event to scroll to the movie
                resultItem.addEventListener('click', () => {
                    // Find the movie card
                    const movieCards = document.querySelectorAll('.carouselCard');
                    const targetCard = movieCards[movie.id - 1]; // ID is 1-based, array is 0-based
                    
                    if (targetCard) {
                        // Calculate position and scroll to movie
                        const container = document.querySelector('.carouselCardConatiner');
                        const containerRect = container.getBoundingClientRect();
                        const cardRect = targetCard.getBoundingClientRect();
                        const scrollLeft = container.scrollLeft + (cardRect.left - containerRect.left) - 50;
                        
                        container.scrollTo({
                            left: scrollLeft,
                            behavior: 'smooth'
                        });
                        
                        // Highlight the found movie
                        targetCard.style.transform = 'scale(1.1)';
                        targetCard.style.boxShadow = '0 0 20px rgba(229, 9, 20, 0.6)';
                        
                        setTimeout(() => {
                            targetCard.style.transform = '';
                            targetCard.style.boxShadow = '';
                        }, 2000);
                        
                        // Close search results
                        searchResults.classList.remove('active');
                    }
                });
                
                searchResults.appendChild(resultItem);
            });
        } else {
            // No results found - keep original search icon
            searchButton.classList.remove('found');
            
            // No results found
            const noResults = document.createElement('div');
            noResults.className = 'noResults';
            noResults.textContent = 'No movies found matching your search.';
            searchResults.appendChild(noResults);
        }
        
        // Show results
        searchResults.classList.add('active');
    }
    
    // Event listeners for search
    searchButton.addEventListener('click', performSearch);
    
    searchInput.addEventListener('keyup', function(event) {
        if (event.key === 'Enter') {
            performSearch();
        } else if (searchInput.value.trim() === '') {
            searchResults.classList.remove('active');
            // Reset search button if input is cleared
            document.querySelector('.searchButton').classList.remove('found');
        } else {
            // Auto-search as user types (optional, can be removed if not wanted)
            performSearch();
        }
    });
    
    // Close search results when clicking outside
    document.addEventListener('click', function(event) {
        if (!searchInput.contains(event.target) && 
            !searchButton.contains(event.target) && 
            !searchResults.contains(event.target)) {
            searchResults.classList.remove('active');
        }
    });
    
    // Language dropdown functionality
    const languageDropdown = document.querySelector('.language-dropdown');
    const languageButton = document.querySelector('.languageButton');
    const dropdownItems = document.querySelectorAll('.dropdown-item');

    if (languageDropdown && languageButton) {
        // Toggle dropdown on button click
        languageButton.addEventListener('click', (event) => {
            event.stopPropagation();
            languageDropdown.classList.toggle('open');
        });
        
        // Close dropdown when clicking elsewhere
        document.addEventListener('click', (event) => {
            if (!languageDropdown.contains(event.target)) {
                languageDropdown.classList.remove('open');
            }
        });
        
        // Handle language selection
        dropdownItems.forEach(item => {
            item.addEventListener('click', () => {
                const lang = item.dataset.lang;
                const langText = item.textContent;
                
                // Update button text
                languageButton.querySelector('p').textContent = langText;
                
                // Update active class
                dropdownItems.forEach(i => i.classList.remove('active'));
                item.classList.add('active');
                
                // Close dropdown
                languageDropdown.classList.remove('open');
            });
        });
    }
}); 