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
}); 