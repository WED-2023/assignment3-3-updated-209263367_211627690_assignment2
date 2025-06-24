<template>
  <div class="card h-100 recipe-preview" @click="goToDetails" style="cursor:pointer;">
    <img v-if="recipe.image" :src="recipe.image" class="card-img-top recipe-image" :alt="recipe.title" />
    <div class="card-body text-center">
      <h5 class="card-title">{{ recipe.title }}</h5>
      <p class="card-text mb-1">
        <span>{{ recipe.readyInMinutes }} min</span>
        <span v-if="recipe.popularity"> | {{ recipe.popularity }} likes</span>
      </p>
      <div class="mb-2">
        <span v-if="recipe.glutenFree" class="badge bg-success me-1" title="Gluten Free">Gluten Free</span>
        <span v-if="recipe.vegan" class="badge bg-success me-1" title="Vegan">Vegan</span>
        <span v-if="recipe.vegetarian" class="badge bg-success me-1" title="Vegetarian">Vegetarian</span>
      </div>
      <div class="mb-2">
        <span v-if="recipe.favorite" class="badge bg-warning text-dark me-1" title="Favorite">★ Favorite</span>
        <span v-if="recipe.viewed" class="badge bg-secondary me-1" title="Viewed">👁️ Viewed</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "RecipePreview",
  props: {
    recipe: {
      type: Object,
      required: true
    }
  },
  methods: {
    goToDetails() {
      this.$router.push({ name: "recipe", params: { recipeId: this.recipe.id } });
    }
  }
}
</script>

<style scoped>
.recipe-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
}
.recipe-preview:hover {
  box-shadow: 0 0 0 2px #06b6d4;
  transition: box-shadow 0.2s;
}
</style>