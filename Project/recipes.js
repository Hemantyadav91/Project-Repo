class RecipeManager {
    constructor() {
        this.recipes = JSON.parse(localStorage.getItem('recipes')) || this.getDefaultRecipes();
        this.filteredRecipes = [...this.recipes];
        this.currentPage = 1;
        this.recipesPerPage = 9;
    }

    getDefaultRecipes() {
        const defaultRecipes = [
            {
                name: 'Classic Pancakes',
                description: 'Fluffy breakfast pancakes with maple syrup',
                category: 'breakfast',
                difficulty: 'easy',
                cookingTime: 15,
                ingredients: [
                    '2 cups all-purpose flour',
                    '2 tablespoons sugar',
                    '2 teaspoons baking powder',
                    '1/2 teaspoon salt',
                    '2 eggs',
                    '1 3/4 cups milk',
                    '1/4 cup melted butter'
                ],
                instructions: [
                    'Mix dry ingredients in a large bowl',
                    'Whisk eggs, milk, and melted butter in another bowl',
                    'Combine wet and dry ingredients',
                    'Heat griddle or pan',
                    'Pour 1/4 cup batter for each pancake',
                    'Cook until bubbles form, then flip',
                    'Serve hot with maple syrup'
                ],
                imageUrl: 'pancakes.jpg'
            },
            {
                name: 'Vegetarian Pasta Salad',
                description: 'Fresh and colorful Mediterranean-style pasta salad',
                category: 'vegetarian',
                difficulty: 'easy',
                cookingTime: 20,
                ingredients: [
                    '8 oz pasta',
                    '1 cucumber, diced',
                    '1 cup cherry tomatoes, halved',
                    '1/2 red onion, chopped',
                    '1/2 cup feta cheese',
                    '1/4 cup olive oil',
                    '2 tablespoons lemon juice',
                    'Fresh herbs (basil, parsley)'
                ],
                instructions: [
                    'Cook pasta according to package instructions',
                    'Drain and cool pasta',
                    'Chop vegetables',
                    'Mix pasta with vegetables and cheese',
                    'Whisk olive oil and lemon juice',
                    'Pour dressing over salad',
                    'Garnish with fresh herbs'
                ],
                imageUrl: 'pasta-salad.jpg'
            },
            {
                name: 'Chicken Stir Fry',
                description: 'Quick and easy Asian-inspired chicken stir fry',
                category: 'dinner',
                difficulty: 'medium',
                cookingTime: 25,
                ingredients: [
                    '2 chicken breasts, sliced',
                    '1 bell pepper, sliced',
                    '1 cup broccoli florets',
                    '2 cloves garlic, minced',
                    '3 tablespoons soy sauce',
                    '2 tablespoons sesame oil',
                    '1 tablespoon cornstarch',
                    'Salt and pepper to taste'
                ],
                instructions: [
                    'Slice chicken and vegetables',
                    'Heat sesame oil in a large wok',
                    'Stir fry garlic for 30 seconds',
                    'Add chicken, cook until golden',
                    'Add vegetables, stir fry for 5 minutes',
                    'Mix soy sauce and cornstarch',
                    'Pour sauce over stir fry',
                    'Cook for additional 2-3 minutes'
                ],
                imageUrl: 'chicken-stir-fry.jpg'
            },
            {
                name: 'Chocolate Lava Cake',
                description: 'Decadent chocolate cake with a molten center',
                category: 'dessert',
                difficulty: 'hard',
                cookingTime: 30,
                ingredients: [
                    '1/2 cup unsalted butter',
                    '4 oz dark chocolate',
                    '2 eggs',
                    '2 egg yolks',
                    '1/4 cup sugar',
                    '2 tablespoons flour',
                    'Pinch of salt',
                    'Powdered sugar for dusting'
                ],
                instructions: [
                    'Melt butter and chocolate together',
                    'Whisk eggs, egg yolks, and sugar',
                    'Fold in melted chocolate mixture',
                    'Gently fold in flour and salt',
                    'Grease ramekins',
                    'Pour batter into ramekins',
                    'Bake at 425°F for 12-14 minutes',
                    'Let rest for 1 minute',
                    'Invert onto plate, dust with sugar'
                ],
                imageUrl: 'lava-cake.jpg'
            },
            {
                name: 'Vegan Buddha Bowl',
                description: 'Nutritious and colorful plant-based bowl',
                category: 'vegan',
                difficulty: 'easy',
                cookingTime: 35,
                ingredients: [
                    '1 cup quinoa',
                    '1 sweet potato, cubed',
                    '1 cup chickpeas',
                    '1 avocado, sliced',
                    '1 cup kale, chopped',
                    '2 tablespoons tahini',
                    '1 tablespoon lemon juice',
                    'Salt and pepper to taste'
                ],
                instructions: [
                    'Cook quinoa according to package',
                    'Roast sweet potato cubes',
                    'Drain and roast chickpeas',
                    'Massage kale with lemon juice',
                    'Mix tahini with water for dressing',
                    'Assemble bowl with quinoa base',
                    'Add roasted vegetables and chickpeas',
                    'Top with avocado and dressing'
                ],
                imageUrl: 'buddha-bowl.jpg'
            },
            {
                name: 'Classic Caesar Salad',
                description: 'Traditional Caesar salad with homemade dressing',
                category: 'lunch',
                difficulty: 'medium',
                cookingTime: 20,
                ingredients: [
                    '1 romaine lettuce',
                    '1/2 cup croutons',
                    '1/4 cup parmesan cheese',
                    '2 anchovy fillets (optional)',
                    '1 egg yolk',
                    '2 garlic cloves',
                    '1/4 cup olive oil',
                    '2 tablespoons lemon juice'
                ],
                instructions: [
                    'Chop romaine lettuce',
                    'Make dressing: blend garlic, anchovy, egg yolk',
                    'Slowly whisk in olive oil',
                    'Add lemon juice and season',
                    'Toss lettuce with dressing',
                    'Top with croutons',
                    'Sprinkle parmesan cheese'
                ],
                imageUrl: 'caesar-salad.jpg'
            }
        ];

        localStorage.setItem('recipes', JSON.stringify(defaultRecipes));
        return defaultRecipes;
    }

    filterRecipes(searchTerm, category, difficulty, cookingTime) {
        this.filteredRecipes = this.recipes.filter(recipe => {
            const matchesSearch = !searchTerm || 
                recipe.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                recipe.description.toLowerCase().includes(searchTerm.toLowerCase());
            
            const matchesCategory = !category || recipe.category === category;
            const matchesDifficulty = !difficulty || recipe.difficulty === difficulty;
            const matchesCookingTime = !cookingTime || 
                (recipe.cookingTime <= parseInt(cookingTime));

            return matchesSearch && matchesCategory && matchesDifficulty && matchesCookingTime;
        });

        this.currentPage = 1;
        this.renderRecipes();
    }

    renderRecipes() {
        const recipesContainer = document.getElementById('recipes-container');
        recipesContainer.innerHTML = '';

        const startIndex = (this.currentPage - 1) * this.recipesPerPage;
        const endIndex = startIndex + this.recipesPerPage;
        const paginatedRecipes = this.filteredRecipes.slice(startIndex, endIndex);

        paginatedRecipes.forEach(recipe => {
            const recipeCard = document.createElement('div');
            recipeCard.classList.add('recipe-card');
            recipeCard.innerHTML = `
                <div class="recipe-image" style="background-image: url('${recipe.imageUrl || 'default-recipe.jpg'}')"></div>
                <div class="recipe-details">
                    <h3>${recipe.name}</h3>
                    <div class="recipe-meta">
                        <span class="category">${recipe.category}</span>
                        <span class="difficulty">${recipe.difficulty}</span>
                        <span class="cooking-time">${recipe.cookingTime} mins</span>
                    </div>
                    <p>${recipe.description}</p>
                    <button class="view-recipe-btn" data-name="${recipe.name}">View Recipe</button>
                </div>
            `;
            recipesContainer.appendChild(recipeCard);
        });

        this.updatePagination();
        this.attachRecipeEventListeners();
    }

    updatePagination() {
        const pageInfo = document.getElementById('page-info');
        const prevPageBtn = document.getElementById('prev-page');
        const nextPageBtn = document.getElementById('next-page');

        const totalPages = Math.ceil(this.filteredRecipes.length / this.recipesPerPage);
        pageInfo.textContent = `Page ${this.currentPage} of ${totalPages}`;

        prevPageBtn.disabled = this.currentPage === 1;
        nextPageBtn.disabled = this.currentPage === totalPages;
    }

    attachRecipeEventListeners() {
        const viewButtons = document.querySelectorAll('.view-recipe-btn');
        viewButtons.forEach(button => {
            button.addEventListener('click', () => this.showRecipeDetails(button.dataset.name));
        });
    }

    showRecipeDetails(recipeName) {
        const recipe = this.recipes.find(r => r.name === recipeName);
        if (recipe) {
            const detailsModal = document.createElement('div');
            detailsModal.classList.add('recipe-details-modal');
            detailsModal.innerHTML = `
                <div class="modal-content">
                    <span class="close-modal">&times;</span>
                    <div class="recipe-header">
                        <h2>${recipe.name}</h2>
                        <div class="recipe-meta">
                            <span>Category: ${recipe.category}</span>
                            <span>Difficulty: ${recipe.difficulty}</span>
                            <span>Cooking Time: ${recipe.cookingTime} mins</span>
                        </div>
                    </div>
                    <img src="${recipe.imageUrl || 'default-recipe.jpg'}" alt="${recipe.name}">
                    <div class="recipe-content">
                        <h3>Description</h3>
                        <p>${recipe.description}</p>
                        <h3>Ingredients</h3>
                        <ul>${recipe.ingredients.map(ing => `<li>${ing}</li>`).join('')}</ul>
                        <h3>Instructions</h3>
                        <ol>${recipe.instructions.map(step => `<li>${step}</li>`).join('')}</ol>
                    </div>
                </div>
            `;
            document.body.appendChild(detailsModal);

            const closeModal = detailsModal.querySelector('.close-modal');
            closeModal.addEventListener('click', () => {
                document.body.removeChild(detailsModal);
            });
        }
    }

    changePage(direction) {
        const totalPages = Math.ceil(this.filteredRecipes.length / this.recipesPerPage);
        
        if (direction === 'next' && this.currentPage < totalPages) {
            this.currentPage++;
        } else if (direction === 'prev' && this.currentPage > 1) {
            this.currentPage--;
        }

        this.renderRecipes();
    }

    submitRecipe(recipeData) {
        this.recipes.push(recipeData);
        localStorage.setItem('recipes', JSON.stringify(this.recipes));
        this.filteredRecipes = [...this.recipes];
        this.renderRecipes();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const recipeManager = new RecipeManager();

    // Initial render
    recipeManager.renderRecipes();

    // Search functionality
    const searchInput = document.getElementById('recipe-search');
    const searchBtn = document.querySelector('.search-btn');
    searchBtn.addEventListener('click', () => {
        const searchTerm = searchInput.value;
        const category = document.getElementById('category-filter').value;
        const difficulty = document.getElementById('difficulty-filter').value;
        const cookingTime = document.getElementById('time-filter').value;

        recipeManager.filterRecipes(searchTerm, category, difficulty, cookingTime);
    });

    // Filter event listeners
    const categoryFilter = document.getElementById('category-filter');
    const difficultyFilter = document.getElementById('difficulty-filter');
    const timeFilter = document.getElementById('time-filter');

    [categoryFilter, difficultyFilter, timeFilter].forEach(filter => {
        filter.addEventListener('change', () => {
            const searchTerm = searchInput.value;
            const category = categoryFilter.value;
            const difficulty = difficultyFilter.value;
            const cookingTime = timeFilter.value;

            recipeManager.filterRecipes(searchTerm, category, difficulty, cookingTime);
        });
    });

    // Pagination event listeners
    const prevPageBtn = document.getElementById('prev-page');
    const nextPageBtn = document.getElementById('next-page');

    prevPageBtn.addEventListener('click', () => recipeManager.changePage('prev'));
    nextPageBtn.addEventListener('click', () => recipeManager.changePage('next'));

    // Recipe Submission Modal
    const submitRecipeBtn = document.getElementById('submit-recipe-btn');
    const recipeSubmissionModal = document.getElementById('recipe-submission-modal');
    const closeModalBtn = recipeSubmissionModal.querySelector('.close-modal');
    const recipeSubmissionForm = document.getElementById('recipe-submission-form');

    submitRecipeBtn.addEventListener('click', () => {
        recipeSubmissionModal.style.display = 'block';
    });

    closeModalBtn.addEventListener('click', () => {
        recipeSubmissionModal.style.display = 'none';
    });

    recipeSubmissionForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const newRecipe = {
            name: document.getElementById('recipe-name').value,
            description: document.getElementById('recipe-description').value,
            category: document.getElementById('recipe-category').value,
            difficulty: document.getElementById('recipe-difficulty').value,
            cookingTime: parseInt(document.getElementById('recipe-time').value),
            ingredients: document.getElementById('recipe-ingredients').value.split('\n'),
            instructions: document.getElementById('recipe-instructions').value.split('\n'),
            imageUrl: null
        };

        // Handle image upload
        const imageFile = document.getElementById('recipe-image').files[0];
        if (imageFile) {
            const reader = new FileReader();
            reader.onloadend = () => {
                newRecipe.imageUrl = reader.result;
                recipeManager.submitRecipe(newRecipe);
                recipeSubmissionModal.style.display = 'none';
                recipeSubmissionForm.reset();
            };
            reader.readAsDataURL(imageFile);
        } else {
            recipeManager.submitRecipe(newRecipe);
            recipeSubmissionModal.style.display = 'none';
            recipeSubmissionForm.reset();
        }
    });
});
