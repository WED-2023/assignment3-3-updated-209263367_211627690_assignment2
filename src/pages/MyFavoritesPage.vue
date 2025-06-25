<template>
  <div class="container mt-4">
    <h2>My Favorites</h2>
    <div v-if="loading" class="text-center my-4">
      <div class="spinner-border text-info" role="status"></div>
    </div>
    <div v-else>
      <div v-if="recipes.length === 0" class="text-muted text-center">No favorite recipes yet.</div>
      <div class="row">
        <div class="col" v-for="r in recipes" :key="r.id">
          <RecipePreview class="recipePreview" :recipe="r" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import RecipePreview from "../components/RecipePreview.vue";

export default {
  name: "MyFavoritesPage",
  components: { RecipePreview },
  data() {
    return {
      recipes: [],
      loading: true,
    };
  },
  mounted() {
    this.updateRecipes();
  },
  methods: {
    async updateRecipes() {
      this.loading = true;
      try {
        const response = await this.axios.get(
          this.$root.store.server_domain + "/users/favorites",
          { withCredentials: true }
        );
        
        // Map the backend data to match RecipePreview expectations
        const recipes = response.data.map(recipe => ({
          id: recipe.recipe_id || recipe.id,
          title: recipe.title,
          readyInMinutes: recipe.prep_time || recipe.readyInMinutes || 0,
          image: recipe.image_url || recipe.image,
          popularity: recipe.likes_count || recipe.popularity || 0,
          vegan: recipe.is_vegan === 1 || recipe.vegan,
          vegetarian: recipe.is_vegetarian === 1 || recipe.vegetarian,
          glutenFree: recipe.is_gluten_free === 1 || recipe.glutenFree,
          favorite: true, // These are favorite recipes
          viewed: recipe.viewed || false
        }));
        
        this.recipes = recipes;
      } catch (error) {
        console.log(error);
      }
      this.loading = false;
    }
  }
};
</script>

<style scoped>
.container {
  min-height: 400px;
}
</style>