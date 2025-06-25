<template>
  <div class="container mt-4">
    <h2 class="mb-4">My Favorites</h2>
    <div v-if="loading" class="text-center my-5">
      <div class="spinner-border text-primary" role="status"></div>
    </div>
    <div v-else>
      <div v-if="favorites.length === 0" class="alert alert-info">
        You have no favorite recipes yet.
      </div>
      <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        <div class="col" v-for="recipe in favorites" :key="recipe.recipe_id">
          <div class="card favorite-card h-100 shadow-sm">
            <img :src="recipe.image_url" class="card-img-top recipe-img" :alt="recipe.title">
            <div class="card-body">
              <h5 class="card-title">{{ recipe.title }}</h5>
              <p class="card-text mb-1"><strong>Servings:</strong> {{ recipe.servings }}</p>
              <p class="card-text mb-1"><strong>Prep Time:</strong> {{ recipe.prep_time }} min</p>
              <div class="mb-2">
                <span class="badge bg-success me-1" v-if="recipe.glutenFree">Gluten Free</span>
                <span class="badge bg-success me-1" v-if="recipe.vegan">Vegan</span>
                <span class="badge bg-success me-1" v-if="recipe.vegetarian">Vegetarian</span>
                <span class="badge bg-warning text-dark me-1" v-if="recipe.favorite">★ Favorite</span>
                <span class="badge bg-secondary me-1" v-if="recipe.viewed">👁️ Viewed</span>
              </div>   
              <details>
                <summary class="instructions-summary">Instructions</summary>
                <pre class="mb-0 recipe-instructions">{{ recipe.instructions }}</pre>
              </details>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, getCurrentInstance } from 'vue';
import axios from 'axios';

const favorites = ref([]);
const loading = ref(true);

// Get store from global properties
const store = getCurrentInstance().appContext.config.globalProperties.store;

onMounted(async () => {
  try {
    const response = await axios.get(
      `${store.server_domain}/users/favorites`,
      { withCredentials: true }
    );
    // Ensure favorites is always an array
    favorites.value = Array.isArray(response.data) ? response.data : [];
  } catch (err) {
    favorites.value = [];
  }
  loading.value = false;
});
</script>
<style scoped>
.favorite-card {
  border-radius: 16px;
  transition: box-shadow 0.2s;
  background: #fff;
}
.favorite-card:hover {
  box-shadow: 0 4px 24px rgba(60, 72, 88, 0.15);
}
.recipe-img {
  object-fit: cover;
  height: 200px;
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
}
.instructions-summary {
  cursor: pointer;
  color: #0d6efd;
  font-weight: 500;
  margin-bottom: 0.5rem;
}
.recipe-instructions {
  background: #f8fafc;
  border-radius: 8px;
  padding: 12px;
  font-size: 1rem;
  white-space: pre-wrap;
  margin-top: 0.5rem;
}
</style>