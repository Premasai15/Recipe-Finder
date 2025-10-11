let ingredients = [];
        let currentRecipes = [];

        // Using Spoonacular API - Free tier: 150 requests/day
        // Get your free API key at: https://spoonacular.com/food-api/console#Dashboard
        const SPOONACULAR_API_KEY = 'f35d0725f1c6442c92cfec2b8b089308';
        const SPOONACULAR_BASE_URL = 'https://api.spoonacular.com';
        const USE_DEMO_MODE = false; // Set to false when you have your API key

        function showError(message) {
            const errorEl = document.getElementById('errorMessage');
            errorEl.textContent = message;
            errorEl.style.display = 'block';
            setTimeout(() => errorEl.style.display = 'none', 5000);
        }

        const recipeDatabase = [
            {
                id: 1,
                title: "Classic Spaghetti Carbonara",
                image: "https://images.unsplash.com/photo-1612874742237-6526221588e3?w=400",
                readyInMinutes: 25,
                servings: 4,
                ingredients: ["pasta", "eggs", "bacon", "parmesan", "garlic"],
                diet: ["vegetarian-friendly"],
                cuisine: "italian",
                mealType: "dinner",
                instructions: [
                    "Cook pasta according to package directions in salted boiling water",
                    "While pasta cooks, fry bacon until crispy and set aside",
                    "In a bowl, whisk eggs with grated parmesan cheese",
                    "Drain pasta, reserving 1 cup pasta water",
                    "Toss hot pasta with egg mixture, adding pasta water to create creamy sauce",
                    "Add crispy bacon and minced garlic, season with black pepper",
                    "Serve immediately with extra parmesan"
                ]
            },
            {
                id: 2,
                title: "Chicken Stir Fry",
                image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400",
                readyInMinutes: 20,
                servings: 3,
                ingredients: ["chicken", "vegetables", "soy sauce", "garlic", "ginger", "rice"],
                diet: ["gluten-free"],
                cuisine: "chinese",
                mealType: "dinner",
                instructions: [
                    "Cut chicken into bite-sized pieces and marinate with soy sauce",
                    "Heat oil in a wok or large pan over high heat",
                    "Add chicken and cook until golden brown, then remove",
                    "Stir fry vegetables with minced garlic and ginger",
                    "Return chicken to pan and add sauce",
                    "Serve hot over steamed rice"
                ]
            },
            {
                id: 3,
                title: "Margherita Pizza",
                image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400",
                readyInMinutes: 30,
                servings: 2,
                ingredients: ["flour", "tomato", "mozzarella", "basil", "olive oil"],
                diet: ["vegetarian"],
                cuisine: "italian",
                mealType: "lunch",
                instructions: [
                    "Prepare pizza dough and let it rest for 10 minutes",
                    "Roll out dough into a circle",
                    "Spread tomato sauce evenly over the base",
                    "Add sliced mozzarella cheese",
                    "Bake in preheated oven at 450°F for 12-15 minutes",
                    "Top with fresh basil leaves and drizzle with olive oil",
                    "Slice and serve hot"
                ]
            },
            {
                id: 4,
                title: "Vegetable Curry",
                image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400",
                readyInMinutes: 35,
                servings: 4,
                ingredients: ["vegetables", "coconut milk", "curry powder", "onion", "garlic", "rice"],
                diet: ["vegan", "gluten-free", "dairy-free"],
                cuisine: "indian",
                mealType: "dinner",
                instructions: [
                    "Sauté diced onion and garlic in oil until golden",
                    "Add curry powder and cook for 1 minute",
                    "Add chopped vegetables and stir well",
                    "Pour in coconut milk and simmer for 20 minutes",
                    "Season with salt and pepper to taste",
                    "Serve over basmati rice with fresh cilantro"
                ]
            },
            {
                id: 5,
                title: "Greek Salad",
                image: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400",
                readyInMinutes: 10,
                servings: 2,
                ingredients: ["tomato", "cucumber", "feta", "olives", "onion", "lettuce"],
                diet: ["vegetarian", "gluten-free"],
                cuisine: "greek",
                mealType: "lunch",
                instructions: [
                    "Chop tomatoes, cucumbers, and onions into bite-sized pieces",
                    "Add to a large bowl with lettuce",
                    "Crumble feta cheese on top",
                    "Add olives and mix gently",
                    "Drizzle with olive oil and lemon juice",
                    "Season with oregano, salt, and pepper"
                ]
            },
            {
                id: 6,
                title: "Beef Tacos",
                image: "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=400",
                readyInMinutes: 20,
                servings: 4,
                ingredients: ["beef", "tortillas", "cheese", "lettuce", "tomato", "onion"],
                diet: [],
                cuisine: "mexican",
                mealType: "dinner",
                instructions: [
                    "Brown ground beef in a pan with taco seasoning",
                    "Warm tortillas in a dry pan or microwave",
                    "Fill tortillas with seasoned beef",
                    "Top with shredded cheese, lettuce, diced tomatoes",
                    "Add diced onions and your favorite salsa",
                    "Serve with lime wedges and sour cream"
                ]
            },
            {
                id: 7,
                title: "Pancakes",
                image: "https://images.unsplash.com/photo-1528207776546-365bb710ee93?w=400",
                readyInMinutes: 15,
                servings: 3,
                ingredients: ["flour", "eggs", "milk", "butter", "sugar"],
                diet: ["vegetarian"],
                cuisine: "american",
                mealType: "breakfast",
                instructions: [
                    "Mix flour, sugar, and a pinch of salt in a bowl",
                    "In another bowl, whisk eggs with milk",
                    "Combine wet and dry ingredients, don't overmix",
                    "Heat butter in a pan over medium heat",
                    "Pour batter to form pancakes, cook until bubbles form",
                    "Flip and cook other side until golden",
                    "Serve with maple syrup and butter"
                ]
            },
            {
                id: 8,
                title: "Salmon with Vegetables",
                image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400",
                readyInMinutes: 25,
                servings: 2,
                ingredients: ["salmon", "vegetables", "lemon", "garlic", "olive oil"],
                diet: ["gluten-free", "dairy-free"],
                cuisine: "mediterranean",
                mealType: "dinner",
                instructions: [
                    "Preheat oven to 400°F",
                    "Place salmon fillets on a baking sheet",
                    "Arrange chopped vegetables around salmon",
                    "Drizzle with olive oil and lemon juice",
                    "Season with minced garlic, salt, and pepper",
                    "Bake for 15-18 minutes until salmon is cooked through",
                    "Serve with lemon wedges"
                ]
            },
            {
                id: 9,
                title: "Butter Chicken",
                image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=400",
                readyInMinutes: 45,
                servings: 4,
                ingredients: ["chicken", "tomato", "butter", "cream", "onion", "garlic", "ginger", "spices"],
                diet: ["gluten-free"],
                cuisine: "indian",
                mealType: "lunch",
                instructions: [
                    "Marinate chicken pieces in yogurt and spices",
                    "Sauté onions, garlic, and ginger until golden",
                    "Add tomato puree and cook until oil separates",
                    "Add marinated chicken and cook until done",
                    "Stir in butter and cream",
                    "Simmer for 10 minutes",
                    "Garnish with cilantro and serve with rice or naan"
                ]
            },
            {
                id: 10,
                title: "Chicken Tikka Masala",
                image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400",
                readyInMinutes: 40,
                servings: 4,
                ingredients: ["chicken", "tomato", "yogurt", "onion", "garlic", "ginger", "cream", "spices"],
                diet: ["gluten-free"],
                cuisine: "indian",
                mealType: "dinner",
                instructions: [
                    "Marinate chicken in yogurt and tikka masala spices",
                    "Grill or bake chicken until charred",
                    "Make sauce with tomatoes, onions, garlic, and ginger",
                    "Add cream and spices to sauce",
                    "Add cooked chicken to sauce",
                    "Simmer for 15 minutes",
                    "Serve hot with basmati rice"
                ]
            },
            {
                id: 11,
                title: "Chicken Biryani",
                image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400",
                readyInMinutes: 60,
                servings: 6,
                ingredients: ["chicken", "rice", "onion", "tomato", "yogurt", "spices", "mint", "saffron"],
                diet: ["gluten-free"],
                cuisine: "indian",
                mealType: "lunch",
                instructions: [
                    "Marinate chicken with yogurt and spices",
                    "Fry sliced onions until golden brown",
                    "Cook chicken with tomatoes and spices",
                    "Parboil basmati rice with whole spices",
                    "Layer rice and chicken in a pot",
                    "Add saffron milk and fried onions on top",
                    "Cook on low heat for 20 minutes, serve with raita"
                ]
            },
            {
                id: 12,
                title: "Palak Paneer",
                image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400",
                readyInMinutes: 30,
                servings: 4,
                ingredients: ["spinach", "paneer", "tomato", "onion", "garlic", "ginger", "cream", "spices"],
                diet: ["vegetarian", "gluten-free"],
                cuisine: "indian",
                mealType: "lunch",
                instructions: [
                    "Blanch spinach and blend into puree",
                    "Fry paneer cubes until golden and set aside",
                    "Sauté onions, garlic, and ginger",
                    "Add tomatoes and cook until soft",
                    "Add spinach puree and spices",
                    "Stir in cream and paneer cubes",
                    "Simmer for 5 minutes and serve with roti"
                ]
            },
            {
                id: 13,
                title: "Dal Tadka",
                image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400",
                readyInMinutes: 35,
                servings: 4,
                ingredients: ["lentils", "tomato", "onion", "garlic", "ginger", "spices", "ghee"],
                diet: ["vegan", "gluten-free", "dairy-free"],
                cuisine: "indian",
                mealType: "lunch",
                instructions: [
                    "Pressure cook lentils with turmeric until soft",
                    "Mash lentils slightly",
                    "Make tadka with ghee, cumin, garlic, and ginger",
                    "Add chopped onions and tomatoes",
                    "Pour tadka over cooked dal",
                    "Add spices and simmer for 10 minutes",
                    "Garnish with cilantro and serve with rice"
                ]
            },
            {
                id: 14,
                title: "Chicken Curry",
                image: "https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?w=400",
                readyInMinutes: 40,
                servings: 4,
                ingredients: ["chicken", "tomato", "onion", "garlic", "ginger", "coconut milk", "curry powder"],
                diet: ["gluten-free", "dairy-free"],
                cuisine: "indian",
                mealType: "dinner",
                instructions: [
                    "Sauté onions until golden brown",
                    "Add garlic, ginger, and curry powder",
                    "Add chicken pieces and brown on all sides",
                    "Add chopped tomatoes and cook until soft",
                    "Pour in coconut milk and bring to simmer",
                    "Cook covered for 25 minutes until chicken is tender",
                    "Garnish with cilantro and serve with rice"
                ]
            },
            {
                id: 15,
                title: "Aloo Gobi",
                image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=400",
                readyInMinutes: 30,
                servings: 4,
                ingredients: ["potato", "cauliflower", "tomato", "onion", "garlic", "ginger", "spices"],
                diet: ["vegan", "gluten-free", "dairy-free"],
                cuisine: "indian",
                mealType: "lunch",
                instructions: [
                    "Cut potatoes and cauliflower into florets",
                    "Sauté cumin seeds in oil",
                    "Add onions, garlic, and ginger",
                    "Add tomatoes and cook until soft",
                    "Add potatoes and cauliflower with spices",
                    "Cover and cook until vegetables are tender",
                    "Garnish with cilantro and serve hot"
                ]
            }
        ];

        function addIngredient() {
            const input = document.getElementById('ingredientInput');
            const ingredient = input.value.trim().toLowerCase();
            
            if (ingredient && !ingredients.includes(ingredient)) {
                ingredients.push(ingredient);
                updateIngredientsDisplay();
                input.value = '';
            }
        }

        function removeIngredient(ingredient) {
            ingredients = ingredients.filter(i => i !== ingredient);
            updateIngredientsDisplay();
        }

        function updateIngredientsDisplay() {
            const container = document.getElementById('ingredientsList');
            container.innerHTML = ingredients.map(ing => `
                <div class="ingredient-tag">
                    ${ing}
                    <button class="remove-btn" onclick="removeIngredient('${ing}')">×</button>
                </div>
            `).join('');
        }

        function searchRecipes() {
            if (ingredients.length === 0) {
                alert('Please add at least one ingredient!');
                return;
            }

            document.getElementById('loading').style.display = 'block';
            document.getElementById('recipesContainer').innerHTML = '';

            if (USE_DEMO_MODE || SPOONACULAR_API_KEY === 'f35d0725f1c6442c92cfec2b8b089308') {
                if (SPOONACULAR_API_KEY === 'f35d0725f1c6442c92cfec2b8b089308') {
                    showError('Using demo mode. Add your Spoonacular API key for real recipes!');
                }
                fetchDemoRecipes();
            } else {
                fetchRecipesFromSpoonacular();
            }
        }

        function fetchDemoRecipes() {
            setTimeout(() => {
                const diet = document.getElementById('dietFilter').value;
                const cuisine = document.getElementById('cuisineFilter').value;
                const mealType = document.getElementById('mealType').value;

                currentRecipes = recipeDatabase.filter(recipe => {
                    // Check if any ingredient matches
                    const hasIngredient = ingredients.some(ing => 
                        recipe.ingredients.some(recipeIng => 
                            recipeIng.toLowerCase().includes(ing.toLowerCase()) ||
                            ing.toLowerCase().includes(recipeIng.toLowerCase())
                        )
                    );
                    
                    // Check diet filter
                    const matchesDiet = !diet || recipe.diet.some(d => 
                        d.toLowerCase().includes(diet.toLowerCase())
                    );
                    
                    // Check cuisine filter
                    const matchesCuisine = !cuisine || 
                        recipe.cuisine.toLowerCase().includes(cuisine.toLowerCase());
                    
                    // Check meal type filter
                    const matchesMealType = !mealType || 
                        recipe.mealType.toLowerCase().includes(mealType.toLowerCase());
                    
                    return hasIngredient && matchesDiet && matchesCuisine && matchesMealType;
                });

                if (currentRecipes.length === 0) {
                    // If no exact matches, show recipes with at least partial ingredient match
                    currentRecipes = recipeDatabase.filter(recipe => {
                        const hasPartialMatch = ingredients.some(ing => 
                            recipe.title.toLowerCase().includes(ing.toLowerCase())
                        );
                        return hasPartialMatch;
                    });
                }

                displayRecipes();
                document.getElementById('loading').style.display = 'none';
            }, 800);
        }

        async function fetchRecipesFromSpoonacular() {
            try {
                const diet = document.getElementById('dietFilter').value;
                const cuisine = document.getElementById('cuisineFilter').value;
                const mealType = document.getElementById('mealType').value;

                // Build query parameters
                const params = new URLSearchParams({
                    apiKey: SPOONACULAR_API_KEY,
                    includeIngredients: ingredients.join(','),
                    number: 12,
                    addRecipeInformation: true,
                    fillIngredients: true,
                    ranking: 2, // Maximize used ingredients
                    ignorePantry: true
                });

                if (diet) params.append('diet', diet);
                if (cuisine) params.append('cuisine', cuisine);
                if (mealType) params.append('type', mealType);

                const url = `${SPOONACULAR_BASE_URL}/recipes/complexSearch?${params.toString()}`;
                console.log('Fetching from:', url);

                const response = await fetch(url);
                
                if (!response.ok) {
                    if (response.status === 401) {
                        throw new Error('Invalid API key. Please check your Spoonacular API key.');
                    } else if (response.status === 402) {
                        throw new Error('Daily API limit reached (150 calls/day). Try demo mode or try again tomorrow.');
                    }
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                console.log('API Response:', data);

                if (data.results && data.results.length > 0) {
                    // Fetch detailed recipe information including instructions
                    const detailPromises = data.results.map(async (recipe) => {
                        try {
                            const detailUrl = `${SPOONACULAR_BASE_URL}/recipes/${recipe.id}/information?apiKey=${SPOONACULAR_API_KEY}`;
                            const detailResponse = await fetch(detailUrl);
                            if (!detailResponse.ok) return recipe;
                            return await detailResponse.json();
                        } catch (err) {
                            console.error('Error fetching recipe details:', err);
                            return recipe;
                        }
                    });

                    const detailedRecipes = await Promise.all(detailPromises);

                    currentRecipes = detailedRecipes.map((recipe, index) => {
                        // Extract ingredients
                        const ingredientsList = recipe.extendedIngredients 
                            ? recipe.extendedIngredients.map(ing => ing.original)
                            : [];

                        // Extract instructions
                        let instructions = [];
                        if (recipe.analyzedInstructions && recipe.analyzedInstructions.length > 0) {
                            instructions = recipe.analyzedInstructions[0].steps.map(step => step.step);
                        } else if (recipe.instructions) {
                            instructions = recipe.instructions
                                .split(/\.\s+/)
                                .filter(step => step.trim().length > 10)
                                .map(step => step.trim());
                        }

                        return {
                            id: index,
                            spoonacularId: recipe.id,
                            title: recipe.title,
                            image: recipe.image,
                            readyInMinutes: recipe.readyInMinutes || 30,
                            servings: recipe.servings || 4,
                            ingredients: ingredientsList,
                            diet: recipe.diets || [],
                            cuisine: recipe.cuisines && recipe.cuisines.length > 0 
                                ? recipe.cuisines[0] 
                                : 'International',
                            mealType: recipe.dishTypes && recipe.dishTypes.length > 0
                                ? recipe.dishTypes[0]
                                : 'Main Course',
                            instructions: instructions.length > 0 
                                ? instructions 
                                : ['Instructions not available'],
                            sourceUrl: recipe.sourceUrl,
                            healthScore: recipe.healthScore,
                            pricePerServing: recipe.pricePerServing
                        };
                    });

                } else {
                    currentRecipes = [];
                    showError('No recipes found. Try different ingredients or remove filters.');
                }

                displayRecipes();
                document.getElementById('loading').style.display = 'none';

            } catch (error) {
                console.error('Error fetching recipes:', error);
                showError(error.message + ' - Falling back to demo mode...');
                
                // Fall back to demo mode on error
                setTimeout(() => {
                    fetchDemoRecipes();
                }, 1000);
            }
        }

        function displayRecipes() {
            const container = document.getElementById('recipesContainer');
            
            if (currentRecipes.length === 0) {
                container.innerHTML = `
                    <div class="empty-state">
                        <div class="empty-state-icon">😔</div>
                        <h2>No recipes found</h2>
                        <p>Try different ingredients or adjust your filters</p>
                    </div>
                `;
                return;
            }

            container.innerHTML = `
                <div class="recipes-grid">
                    ${currentRecipes.map((recipe, index) => `
                        <div class="recipe-card" onclick="showRecipeDetails(${index})">
                            <img src="${recipe.image}" alt="${recipe.title}" class="recipe-image" onerror="this.src='https://via.placeholder.com/400x200/f093fb/ffffff?text=Recipe+Image'">
                            <div class="recipe-content">
                                <h3 class="recipe-title">${recipe.title}</h3>
                                <div class="recipe-meta">
                                    <div class="meta-item">⏱️ ${recipe.readyInMinutes} min</div>
                                    <div class="meta-item">🍽️ ${recipe.servings} servings</div>
                                </div>
                                <div class="recipe-tags">
                                    <span class="tag">${recipe.cuisine}</span>
                                    <span class="tag">${recipe.mealType}</span>
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            `;
        }

        function showRecipeDetails(recipeId) {
            const recipe = currentRecipes[recipeId];
            if (!recipe) return;

            document.getElementById('modalImage').src = recipe.image;
            document.getElementById('modalTitle').textContent = recipe.title;
            
            let metaHTML = `
                <div class="meta-item">⏱️ ${recipe.readyInMinutes} minutes</div>
                <div class="meta-item">🍽️ ${recipe.servings} servings</div>
                <div class="meta-item">🌍 ${recipe.cuisine}</div>
            `;
            
            if (recipe.healthScore) {
                metaHTML += `<div class="meta-item">💚 Health Score: ${recipe.healthScore}</div>`;
            }
            
            document.getElementById('modalMeta').innerHTML = metaHTML;
            
            // Display ingredients
            document.getElementById('modalIngredients').innerHTML = 
                recipe.ingredients.map(ing => `<li>${ing}</li>`).join('');
            
            // Display instructions
            document.getElementById('modalInstructions').innerHTML = 
                recipe.instructions.map(step => `<li>${step}</li>`).join('');
            
            // Add source link if available
            if (recipe.sourceUrl) {
                document.getElementById('modalInstructions').innerHTML += `
                    <li style="margin-top: 20px;">
                        <a href="${recipe.sourceUrl}" target="_blank" style="color: #f5576c; text-decoration: none; font-weight: bold;">
                            📖 View original recipe source →
                        </a>
                    </li>
                `;
            }

            document.getElementById('recipeModal').style.display = 'block';
        }

        function closeModal() {
            document.getElementById('recipeModal').style.display = 'none';
        }

        document.getElementById('ingredientInput').addEventListener('keypress', e => {
            if (e.key === 'Enter') addIngredient();
        });

        window.addEventListener('click', e => {
            const modal = document.getElementById('recipeModal');
            if (e.target === modal) closeModal();
        });