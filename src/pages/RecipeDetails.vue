<template>
  <div class="container py-4">
    <div v-if="loading" class="text-center my-5">
      <div class="spinner-border text-info" role="status"></div>
    </div>
    <div v-else>
      <div class="card mb-4 shadow">
        <div class="row g-0">
          <div class="col-md-5">
            <img :src="recipe.image" class="img-fluid rounded-start w-100" :alt="recipe.title" />
          </div>
          <div class="col-md-7">
            <div class="card-body">
              <h2 class="card-title mb-2">{{ recipe.title }}</h2>
              <div class="mb-2">
                <span class="badge bg-success me-1" v-if="recipe.glutenFree">Gluten Free</span>
                <span class="badge bg-success me-1" v-if="recipe.vegan">Vegan</span>
                <span class="badge bg-success me-1" v-if="recipe.vegetarian">Vegetarian</span>
                <span class="badge bg-warning text-dark me-1" v-if="isFavorite">★ Favorite</span>
                <span class="badge bg-secondary me-1" v-if="recipe.viewed">👁️ Viewed</span>
              </div>
              <p class="mb-1"><strong>Ready in:</strong> {{ recipe.readyInMinutes }} min</p>
              <p class="mb-1"><strong>Popularity:</strong> {{ recipe.popularity }}</p>
              <p class="mb-1"><strong>Servings:</strong> {{ recipe.amount }}</p>
              <button class="btn btn-primary mt-2" @click="startCooking">Start Cooking</button>
              <button
                class="btn"
                :class="isFavorite ? 'btn-warning' : 'btn-outline-warning'"
                @click="toggleFavorite"
                :disabled="favoriteLoading"
              >
                <span v-if="favoriteLoading" class="spinner-border spinner-border-sm"></span>
                <span v-else>
                  <template v-if="isFavorite">★ Remove from Favorites</template>
                  <template v-else>☆ Add to Favorites</template>
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="card mb-3">
        <div class="card-header fw-bold">Ingredients</div>
        <div class="card-body">
          <pre class="mb-0">{{ recipe.ingredients }}</pre>
        </div>
      </div>
      <div class="card">
        <div class="card-header fw-bold">Instructions</div>
        <div class="card-body">
          <pre class="mb-0">{{ recipe.instructions }}</pre>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { getCurrentInstance, ref, onMounted, watch } from "vue";

export default {
  name: "RecipeDetails",
  setup() {
    const route = window.router.currentRoute;
    const recipe = ref({});
    const loading = ref(true);
    const favoriteLoading = ref(false);
    const isFavorite = ref(false);
    const store = getCurrentInstance().appContext.config.globalProperties.store;

    async function fetchRecipe() {
      loading.value = true;
      try {
        const user_id = store.username || null;
        const response = await axios.get(
          `${store.server_domain}/recipes/PreviewRecipe/${route.value.params.recipeId}`,
          { params: { user_id }, withCredentials: true }
        );
        recipe.value = response.data.recipe;

        // Check if favorite
        const favRes = await axios.get(
          `${store.server_domain}/users/favorites`,
          { withCredentials: true }
        );
        const favIds = favRes.data.map(r => r.recipe_id || r.id);
        isFavorite.value = favIds.includes(recipe.value.id || recipe.value.recipe_id);

        // Mark as viewed (POST)
        await axios.post(
          `${store.server_domain}/recipes/viewed`,
          {
            recipeId: route.value.params.recipeId,
            origin: recipe.value.image && recipe.value.image.includes('spoonacular') ? 'API' : 'DB',
          },
          { withCredentials: true }
        );
      } catch (err) {
        recipe.value = { title: "Recipe not found" };
      }
      loading.value = false;
    }

    function startCooking() {
      window.toast("Let's cook!", "Enjoy your meal!", "success");
    }

    async function toggleFavorite() {
      if (!recipe.value || (!recipe.value.id && !recipe.value.recipe_id)) return;
      favoriteLoading.value = true;
      try {
        if (isFavorite.value) {
          // Remove from favorites
          await axios.delete(
            `${store.server_domain}/users/favorites`,
            {
              data: { recipeId: recipe.value.id || recipe.value.recipe_id },
              withCredentials: true
            }
          );
          window.toast("Removed from favorites!", "This recipe is no longer in your favorites.", "info");
          isFavorite.value = false;
        } else {
          // Add to favorites
          await axios.post(
            `${store.server_domain}/users/favorites`,
            { recipeId: recipe.value.id || recipe.value.recipe_id },
            { withCredentials: true }
          );
          window.toast("Added to favorites!", "This recipe is now in your favorites.", "success");
          isFavorite.value = true;
        }
      } catch (err) {
        window.toast("Failed", "Could not update favorites.", "error");
      }
      favoriteLoading.value = false;
    }

    onMounted(fetchRecipe);
    watch(() => route.value.params.recipeId, fetchRecipe);

    return { recipe, loading, startCooking, toggleFavorite, favoriteLoading, isFavorite };
  }
};
</script>

<style scoped>
pre {
  background: #f8fafc;
  border-radius: 8px;
  padding: 12px;
  font-size: 1rem;
  white-space: pre-wrap;
}
.card-title {
  font-size: 2rem;
  font-weight: bold;
}
.card {
  margin-bottom: 1.5rem;
}
</style>