<template>
  <div class="container mt-4">
    <h2>My Recipes</h2>
    <div v-if="loading" class="text-center my-4">
      <div class="spinner-border text-info" role="status"></div>
    </div>
    <div v-else>
      <div v-if="recipes.length === 0" class="text-muted text-center">
        <p>You haven't created any recipes yet.</p>
        <router-link :to="{ name: 'createRecipe' }" class="btn btn-primary">
          Create Your First Recipe
        </router-link>
      </div>
      <div v-else>
        <div class="row">
          <div class="col-md-4 mb-3" v-for="recipe in recipes" :key="recipe.id">
            <RecipePreview class="recipePreview" :recipe="recipe" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import RecipePreview from "../components/RecipePreview.vue";

export default {
  name: "MyRecipesPage",
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
          this.$root.store.server_domain + "/users/myRecipes",
          { withCredentials: true }
        );
        
        // Map the backend data to match RecipePreview expectations
        const recipes = response.data.map(recipe => ({
          id: recipe.recipe_id,
          title: recipe.title,
          readyInMinutes: recipe.prep_time,
          image: recipe.image_url,
          popularity: recipe.likes_count,
          vegan: recipe.is_vegan === 1,
          vegetarian: recipe.is_vegetarian === 1,
          glutenFree: recipe.is_gluten_free === 1,
          favorite: false,
          viewed: true
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