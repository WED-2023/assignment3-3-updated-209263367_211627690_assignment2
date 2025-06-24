<template>
  <div class="container">
    <h3>{{ title }}</h3>
    <div v-if="loading" class="text-center my-4">
      <div class="spinner-border text-info" role="status"></div>
    </div>
    <div v-else>
      <div v-if="recipes.length === 0" class="text-muted text-center">No recipes viewed yet.</div>
      <div class="row">
        <div class="col" v-for="r in recipes" :key="r.id">
          <RecipePreview class="recipePreview" :recipe="r" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import RecipePreview from "./RecipePreview.vue";

export default {
  name: "LastViewedRecipes",
  components: { RecipePreview },
  props: {
    title: {
      type: String,
      default: "Last Viewed Recipes"
    }
  },
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
        const response = await this.axios.get( // problem in here 
          this.$root.store.server_domain + "/user/lastWatchedRecipes"
        );
        const recipes = response.data;
        this.recipes = [];
        this.recipes.push(...recipes);
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
  min-height: 200px;
}
</style>