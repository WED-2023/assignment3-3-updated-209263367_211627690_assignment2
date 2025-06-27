<template>
  <div class="container mt-4">
    <h1 class="title mb-4">Search Recipes</h1>
    <form class="row g-3 mb-4" @submit.prevent="searchRecipes">
      <div class="col-md-4">
        <input v-model="query" class="form-control" placeholder="Search for recipes..." />
      </div>
      <div class="col-md-2">
        <input v-model="cuisine" class="form-control" placeholder="Cuisine (optional)" />
      </div>
      <div class="col-md-2">
        <input v-model="diet" class="form-control" placeholder="Diet (optional)" />
      </div>
      <div class="col-md-2">
        <input v-model="intolerances" class="form-control" placeholder="Intolerances (optional)" />
      </div>
      <div class="col-md-1">
        <input v-model.number="number" type="number" min="1" max="20" class="form-control" placeholder="Number" />
      </div>
      <div class="col-md-1">
        <select v-model="sort" class="form-select">
          <option value="">Sort</option>
          <option value="preparationTime">Prep Time</option>
          <option value="popularity">Popularity</option>
        </select>
      </div>
      <div class="col-12 text-end">
        <button class="btn btn-primary" type="submit" :disabled="loading">
          <span v-if="loading" class="spinner-border spinner-border-sm"></span>
          Search
        </button>
      </div>
    </form>

    <div v-if="error" class="alert alert-danger">{{ error }}</div>
    <div v-if="!loading && results.length === 0 && !error" class="alert alert-info">
      No recipes found. Try a different search!
    </div>
    <div v-if="results.length > 0" class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
      <div class="col" v-for="recipe in results" :key="recipe.recipe_id || recipe.id">
        <RecipePreview :recipe="mapRecipe(recipe)" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import RecipePreview from '../components/RecipePreview.vue';

const store = window.store || {}; // or use getCurrentInstance if needed

const query = ref('');
const cuisine = ref('');
const diet = ref('');
const intolerances = ref('');
const number = ref(5);
const sort = ref('');
const loading = ref(false);
const results = ref([]);
const error = ref('');

function mapRecipe(recipe) {
  // Map API result to RecipePreview props
  return {
    id: recipe.recipe_id || recipe.id,
    title: recipe.title,
    image: recipe.image_url || recipe.image,
    readyInMinutes: recipe.prep_time || recipe.readyInMinutes,
    popularity: recipe.likes_count || recipe.popularity,
    vegan: recipe.is_vegan === 1 || recipe.vegan,
    vegetarian: recipe.is_vegetarian === 1 || recipe.vegetarian,
    glutenFree: recipe.is_gluten_free === 1 || recipe.glutenFree,
    servings: recipe.servings,
    instructions: recipe.instructions,
  };
}

async function searchRecipes() {
  loading.value = true;
  error.value = '';
  results.value = [];
  try {
    const params = new URLSearchParams({
      query: query.value,
      cuisine: cuisine.value,
      diet: diet.value,
      intolerances: intolerances.value,
      number: number.value,
      sort: sort.value,
    });
    const res = await fetch(
      (store.server_domain ) + '/recipes/search?' + params.toString(),
      { credentials: 'include' }
    );
    const data = await res.json();
    if (Array.isArray(data)) {
      results.value = data;
    } else if (data.results) {
      results.value = data.results;
    } else {
      results.value = [];
      error.value = data.message || 'No recipes found.';
    }
  } catch (err) {
    error.value = 'Failed to fetch recipes.';
  }
  loading.value = false;
}
</script>

<style scoped>
.title {
  font-family: 'Segoe UI', 'Roboto', Arial, sans-serif;
  font-weight: 700;
  font-size: 2.2rem;
  letter-spacing: 1px;
  text-align: center;
}
form .form-control, form .form-select {
  border-radius: 8px;
}
form .btn {
  min-width: 120px;
}
</style>