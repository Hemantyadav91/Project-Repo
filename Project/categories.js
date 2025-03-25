document.addEventListener('DOMContentLoaded', () => {
    const categoryItems = document.querySelectorAll('.category-item');

    categoryItems.forEach(item => {
        item.addEventListener('mouseover', () => {
            item.classList.add('category-hover');
        });

        item.addEventListener('mouseout', () => {
            item.classList.remove('category-hover');
        });
    });

    // Optional: Add some interactivity to category links
    const categoryLinks = document.querySelectorAll('.category-link');
    categoryLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const category = link.closest('.category-item').dataset.category;
            // You could add additional logic here if needed
            console.log(`Navigating to ${category} recipes`);
        });
    });
});
