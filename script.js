// DOM Elements
const moodCards = document.querySelectorAll('.mood-card');
const dietChips = document.querySelectorAll('.diet-chip');
const recommendBtn = document.getElementById('recommendBtn');
const surpriseBtn = document.getElementById('surpriseBtn');
const resultSection = document.getElementById('resultSection');
const resultImage = document.getElementById('resultImage');
const resultTitle = document.getElementById('resultTitle');
const resultDescription = document.getElementById('resultDescription');
const mealBadges = document.getElementById('mealBadges');
const saveFavoriteBtn = document.getElementById('saveFavoriteBtn');
const shareBtn = document.getElementById('shareBtn');
const refreshBtn = document.getElementById('refreshBtn');
const favoritesBtn = document.getElementById('favoritesBtn');
const favoritesBadge = document.getElementById('favoritesBadge');
const favoritesModal = document.getElementById('favoritesModal');
const closeFavoritesBtn = document.getElementById('closeFavoritesBtn');
const favoritesList = document.getElementById('favoritesList');
const searchBar = document.getElementById('searchBar');
const searchDropdown = document.getElementById('searchDropdown');
const toast = document.getElementById('toast');

// State Variables
let selectedMood = null;
let currentMeal = null;
let activeFilters = {
  vegetarian: false,
  vegan: false,
  glutenFree: false
};

// Use in-memory storage instead of localStorage
let favorites = [];

// Meal Data
const mealsByMood = {
  happy: [
    {
      name: 'Fresh Fruit Salad',
      description: 'A vibrant mix of seasonal fruits bursting with natural sweetness and vitamins to brighten your day.',
      image: 'https://images.unsplash.com/photo-1574226516831-e1dff420e43e?auto=format&fit=crop&w=600&q=80',
      vegetarian: true,
      vegan: true,
      glutenFree: true,
    },
    {
      name: 'Grilled Chicken with Rainbow Veggies',
      description: 'Perfectly grilled chicken breast served with colorful roasted vegetables for a balanced, energizing meal.',
      image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600&q=80',
      vegetarian: false,
      vegan: false,
      glutenFree: true,
    },
    {
      name: 'Pasta Primavera',
      description: 'Light pasta tossed with fresh spring vegetables and herbs in a delicate olive oil sauce.',
      image: 'https://images.unsplash.com/photo-1525755662778-989d0524087e?auto=format&fit=crop&w=600&q=80',
      vegetarian: true,
      vegan: false,
      glutenFree: false,
    },
    {
      name: 'Mediterranean Bowl',
      description: 'Fresh quinoa bowl topped with cucumber, tomatoes, olives, and a zesty lemon dressing.',
      image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=600&q=80',
      vegetarian: true,
      vegan: true,
      glutenFree: true,
    }
  ],
  sad: [
    {
      name: 'Classic Mac and Cheese',
      description: 'Creamy, cheesy comfort food made with three types of cheese and topped with crispy breadcrumbs.',
      image: 'https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=600&q=80',
      vegetarian: true,
      vegan: false,
      glutenFree: false,
    },
    {
      name: 'Warm Chocolate Brownies',
      description: 'Fudgy, rich brownies served warm with a scoop of vanilla ice cream for the ultimate comfort treat.',
      image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=600&q=80',
      vegetarian: true,
      vegan: false,
      glutenFree: false,
    },
    {
      name: 'Tomato Basil Soup',
      description: 'Velvety smooth tomato soup with fresh basil and a hint of cream, perfect for cozy moments.',
      image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=600&q=80',
      vegetarian: true,
      vegan: true,
      glutenFree: true,
    },
    {
      name: 'Chicken Pot Pie',
      description: 'Homestyle comfort with tender chicken and vegetables in a flaky, golden pastry crust.',
      image: 'https://images.unsplash.com/photo-1574894709920-11b28e7367e3?auto=format&fit=crop&w=600&q=80',
      vegetarian: false,
      vegan: false,
      glutenFree: false,
    }
  ],
  energetic: [
    {
      name: 'Power Protein Smoothie',
      description: 'Energizing blend of banana, berries, spinach, and plant protein powder to fuel your active lifestyle.',
      image: 'https://images.unsplash.com/photo-1524594152303-9fd13543fe6e?auto=format&fit=crop&w=600&q=80',
      vegetarian: true,
      vegan: true,
      glutenFree: true,
    },
    {
      name: 'Quinoa Power Bowl',
      description: 'Protein-packed quinoa with black beans, avocado, and roasted sweet potato for sustained energy.',
      image: 'https://images.unsplash.com/photo-1553621042-f6e147245754?auto=format&fit=crop&w=600&q=80',
      vegetarian: true,
      vegan: true,
      glutenFree: true,
    },
    {
      name: 'Avocado Toast with Poached Eggs',
      description: 'Multigrain toast topped with smashed avocado and perfectly poached eggs for protein power.',
      image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=600&q=80',
      vegetarian: true,
      vegan: false,
      glutenFree: false,
    },
    {
      name: 'Salmon Energy Bowl',
      description: 'Grilled salmon over brown rice with edamame and sesame ginger dressing for omega-3 power.',
      image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80',
      vegetarian: false,
      vegan: false,
      glutenFree: true,
    }
  ],
  relaxed: [
    {
      name: 'Herbal Tea & Lavender Scones',
      description: 'Calming chamomile tea paired with delicate lavender-infused scones for a peaceful moment.',
      image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=600&q=80',
      vegetarian: true,
      vegan: false,
      glutenFree: false,
    },
    {
      name: 'Light Caesar Salad',
      description: 'Crisp romaine lettuce with house-made Caesar dressing, parmesan, and herb croutons.',
      image: 'https://images.unsplash.com/photo-1551248429-40975aa4de74?auto=format&fit=crop&w=600&q=80',
      vegetarian: true,
      vegan: false,
      glutenFree: true,
    },
    {
      name: 'Zen Garden Wrap',
      description: 'Soft tortilla filled with hummus, cucumber, sprouts, and roasted vegetables for mindful eating.',
      image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80',
      vegetarian: true,
      vegan: true,
      glutenFree: false,
    },
    {
      name: 'Miso Soup & Rice',
      description: 'Traditional miso soup with tofu and seaweed, served with steamed jasmine rice.',
      image: 'https://images.unsplash.com/photo-1591814468924-caf88d1232e1?auto=format&fit=crop&w=600&q=80',
      vegetarian: true,
      vegan: true,
      glutenFree: true,
    }
  ]
};

// Initialize App
function initApp() {
  setupEventListeners();
  updateFavoritesBadge();
  updateRecommendButton();
}

// Event Listeners
function setupEventListeners() {
  // Mood Selection
  moodCards.forEach(card => {
    card.addEventListener('click', () => selectMood(card));
  });

  // Diet Filters
  dietChips.forEach(chip => {
    chip.addEventListener('click', () => toggleFilter(chip));
  });

  // Action Buttons
  recommendBtn.addEventListener('click', getRecommendation);
  surpriseBtn.addEventListener('click', getSurpriseMeal);
  refreshBtn.addEventListener('click', getRecommendation);

  // Favorites
  saveFavoriteBtn.addEventListener('click', saveFavorite);
  favoritesBtn.addEventListener('click', openFavorites);
  closeFavoritesBtn.addEventListener('click', closeFavorites);

  // Share
  shareBtn.addEventListener('click', shareMeal);

  // Search
  searchBar.addEventListener('ionInput', handleSearch);
  document.addEventListener('click', hideSearchDropdown);
}

// Mood Selection
function selectMood(selectedCard) {
  // Remove previous selection
  moodCards.forEach(card => card.classList.remove('selected'));
  
  // Add selection to clicked card
  selectedCard.classList.add('selected');
  selectedMood = selectedCard.dataset.mood;
  
  // Update recommend button state
  updateRecommendButton();
  
  // Add haptic feedback
  if (navigator.vibrate) {
    navigator.vibrate(50);
  }
}

// Filter Toggle
function toggleFilter(chip) {
  const filter = chip.dataset.filter;
  activeFilters[filter] = !activeFilters[filter];
  
  if (activeFilters[filter]) {
    chip.classList.add('active');
  } else {
    chip.classList.remove('active');
  }
  
  // Update recommend button state
  updateRecommendButton();
}

// Update Recommend Button State
function updateRecommendButton() {
  recommendBtn.disabled = !selectedMood;
}

// Get Meal Recommendation
function getRecommendation() {
  if (!selectedMood) return;
  
  // Add loading state
  showLoadingState(true);
  
  setTimeout(() => {
    let availableMeals = mealsByMood[selectedMood];
    availableMeals = filterMeals(availableMeals);
    
    if (availableMeals.length === 0) {
      showToast('No meals match your current filters. Try adjusting your preferences!', 'warning');
      showLoadingState(false);
      return;
    }
    
    const randomMeal = availableMeals[Math.floor(Math.random() * availableMeals.length)];
    displayMeal(randomMeal);
    showLoadingState(false);
  }, 1000); // Simulate API call
}

// Get Surprise Meal
function getSurpriseMeal() {
  showLoadingState(true);
  
  setTimeout(() => {
    let allMeals = Object.values(mealsByMood).flat();
    allMeals = filterMeals(allMeals);
    
    if (allMeals.length === 0) {
      showToast('No meals match your current filters!', 'warning');
      showLoadingState(false);
      return;
    }
    
    const randomMeal = allMeals[Math.floor(Math.random() * allMeals.length)];
    displayMeal(randomMeal);
    showLoadingState(false);
  }, 1000);
}

// Filter Meals Based on Active Filters
function filterMeals(meals) {
  return meals.filter(meal => {
    if (activeFilters.vegetarian && !meal.vegetarian) return false;
    if (activeFilters.vegan && !meal.vegan) return false;
    if (activeFilters.glutenFree && !meal.glutenFree) return false;
    return true;
  });
}

// Display Meal Result
function displayMeal(meal) {
  currentMeal = meal;
  
  // Update meal info
  resultTitle.textContent = meal.name;
  resultDescription.textContent = meal.description;
  resultImage.src = meal.image;
  resultImage.alt = meal.name;
  
  // Update badges
  updateMealBadges(meal);
  
  // Update favorite button state
  updateFavoriteButton();
  
  // Show result section with animation
  resultSection.style.display = 'block';
  resultSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// Update Meal Badges
function updateMealBadges(meal) {
  mealBadges.innerHTML = '';
  
  if (meal.vegetarian) {
    mealBadges.innerHTML += '<span class="meal-badge">Vegetarian</span>';
  }
  if (meal.vegan) {
    mealBadges.innerHTML += '<span class="meal-badge">Vegan</span>';
  }
  if (meal.glutenFree) {
    mealBadges.innerHTML += '<span class="meal-badge">Gluten-Free</span>';
  }
}

// Update Favorite Button
function updateFavoriteButton() {
  const isFavorite = favorites.some(fav => fav.name === currentMeal.name);
  const icon = saveFavoriteBtn.querySelector('ion-icon');
  
  if (isFavorite) {
    icon.name = 'heart';
    saveFavoriteBtn.style.color = '#ff4444';
  } else {
    icon.name = 'heart-outline';
    saveFavoriteBtn.style.color = '';
  }
}

// Save/Remove Favorite
function saveFavorite() {
  if (!currentMeal) return;
  
  const existingIndex = favorites.findIndex(fav => fav.name === currentMeal.name);
  
  if (existingIndex === -1) {
    // Add to favorites
    favorites.push(currentMeal);
    showToast(`Added "${currentMeal.name}" to favorites! ❤️`, 'success');
  } else {
    // Remove from favorites
    favorites.splice(existingIndex, 1);
    showToast(`Removed "${currentMeal.name}" from favorites`, 'medium');
  }
  
  updateFavoriteButton();
  updateFavoritesBadge();
}

// Share Meal
function shareMeal() {
  if (!currentMeal) return;
  
  if (navigator.share) {
    navigator.share({
      title: `Check out this ${currentMeal.name} from CraveWave!`,
      text: currentMeal.description,
      url: window.location.href
    });
  } else {
    // Fallback for browsers without Web Share API
    const shareText = `Check out this delicious ${currentMeal.name}: ${currentMeal.description}`;
    navigator.clipboard.writeText(shareText).then(() => {
      showToast('Meal details copied to clipboard!', 'success');
    });
  }
}

// Search Functionality
function handleSearch(event) {
  const query = event.target.value.toLowerCase().trim();
  
  if (!query) {
    hideSearchDropdown();
    return;
  }
  
  let allMeals = Object.values(mealsByMood).flat();
  allMeals = filterMeals(allMeals);
  
  const matchedMeals = allMeals.filter(meal => 
    meal.name.toLowerCase().includes(query) ||
    meal.description.toLowerCase().includes(query)
  );
  
  displaySearchResults(matchedMeals);
}

// Display Search Results
function displaySearchResults(meals) {
  searchDropdown.innerHTML = '';
  
  if (meals.length === 0) {
    searchDropdown.innerHTML = '<div class="search-item">No meals found</div>';
  } else {
    meals.forEach(meal => {
      const item = document.createElement('div');
      item.className = 'search-item';
      item.innerHTML = `
        <strong>${meal.name}</strong>
        <br>
        <small style="color: #666;">${meal.description.substring(0, 60)}...</small>
      `;
      item.addEventListener('click', () => {
        displayMeal(meal);
        hideSearchDropdown();
        searchBar.value = '';
      });
      searchDropdown.appendChild(item);
    });
  }
  
  searchDropdown.style.display = 'block';
}

// Hide Search Dropdown
function hideSearchDropdown(event) {
  if (event && (searchBar.contains(event.target) || searchDropdown.contains(event.target))) {
    return;
  }
  searchDropdown.style.display = 'none';
}

// Favorites Modal
function openFavorites() {
  renderFavorites();
  favoritesModal.present();
}

function closeFavorites() {
  favoritesModal.dismiss();
}

function renderFavorites() {
  if (favorites.length === 0) {
    favoritesList.innerHTML = `
      <div class="empty-favorites">
        <ion-icon name="heart-outline" class="empty-icon"></ion-icon>
        <h3>No favorites yet</h3>
        <p>Save meals you love to see them here!</p>
      </div>
    `;
    return;
  }
  
  favoritesList.innerHTML = '<div class="favorites-list"></div>';
  const container = favoritesList.querySelector('.favorites-list');
  
  favorites.forEach(meal => {
    const item = document.createElement('ion-card');
    item.className = 'favorite-item';
    item.innerHTML = `
      <img src="${meal.image}" alt="${meal.name}" class="favorite-image" />
      <ion-card-content class="favorite-content">
        <h3 class="favorite-title">${meal.name}</h3>
        <p class="favorite-description">${meal.description}</p>
      </ion-card-content>
    `;
    
    item.addEventListener('click', () => {
      displayMeal(meal);
      closeFavorites();
    });
    
    container.appendChild(item);
  });
}

// Update Favorites Badge
function updateFavoritesBadge() {
  favoritesBadge.textContent = favorites.length;
  favoritesBadge.style.display = favorites.length > 0 ? 'block' : 'none';
}

// Loading State
function showLoadingState(isLoading) {
  if (isLoading) {
    recommendBtn.innerHTML = '<ion-spinner name="crescent"></ion-spinner>';
    surpriseBtn.innerHTML = '<ion-spinner name="crescent"></ion-spinner>';
    recommendBtn.disabled = true;
    surpriseBtn.disabled = true;
  } else {
    recommendBtn.innerHTML = '<ion-icon name="restaurant" slot="start"></ion-icon>Get My Meal';
    surpriseBtn.innerHTML = '<ion-icon name="shuffle" slot="start"></ion-icon>Surprise Me!';
    recommendBtn.disabled = !selectedMood;
    surpriseBtn.disabled = false;
  }
}

// Toast Notifications
function showToast(message, color = 'success') {
  toast.message = message;
  toast.duration = 3000;
  toast.color = color;
  toast.position = 'bottom';
  toast.present();
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', initApp);