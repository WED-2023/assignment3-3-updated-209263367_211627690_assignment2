<template>
  <div class="container mt-4 create-recipe-page">
    <h2>Create New Recipe</h2>
    <form @submit.prevent="submitRecipe">
      <div class="mb-3">
        <label class="form-label">Title</label>
        <input v-model="form.title" class="form-control" required />
      </div>
      <div class="mb-3">
        <label class="form-label">Image URL</label>
        <input v-model="form.image_url" class="form-control" />
      </div>
      <div class="mb-3">
        <label class="form-label">Prep Time (minutes)</label>
        <input v-model.number="form.prep_time" type="number" class="form-control" required />
      </div>
      <div class="mb-3">
        <label class="form-label">Servings</label>
        <input v-model.number="form.servings" type="number" class="form-control" required />
      </div>
      <div class="mb-3">
        <label class="form-label">Instructions</label>
        <textarea v-model="form.instructions" class="form-control" required></textarea>
      </div>
      <div class="mb-3">
        <label class="form-label">Ingredients (comma separated)</label>
        <input v-model="ingredientsInput" class="form-control" />
      </div>
      <div class="mb-3">
        <label class="form-label">Likes Count</label>
        <input v-model.number="form.likes_count" type="number" class="form-control" />
      </div>
      <div class="form-check mb-2">
        <input v-model="form.is_vegan" type="checkbox" class="form-check-input" id="vegan" />
        <label class="form-check-label" for="vegan">Vegan</label>
      </div>
      <div class="form-check mb-2">
        <input v-model="form.is_vegetarian" type="checkbox" class="form-check-input" id="vegetarian" />
        <label class="form-check-label" for="vegetarian">Vegetarian</label>
      </div>
      <div class="form-check mb-2">
        <input v-model="form.is_gluten_free" type="checkbox" class="form-check-input" id="glutenFree" />
        <label class="form-check-label" for="glutenFree">Gluten Free</label>
      </div>
      <button type="submit" class="btn btn-primary">Create Recipe</button>
      <div v-if="message" class="mt-3 alert" :class="{'alert-success': success, 'alert-danger': !success}">
        {{ message }}
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, getCurrentInstance } from 'vue';

const store = getCurrentInstance().appContext.config.globalProperties.store;

const form = ref({
  title: '',
  image_url: '',
  prep_time: 0,
  servings: 1,
  instructions: '',
  extendedIngredients: [],
  likes_count: 0,
  is_vegan: false,
  is_vegetarian: false,
  is_gluten_free: false
});

const ingredientsInput = ref('');
const message = ref('');
const success = ref(false);

const submitRecipe = async () => {
  form.value.extendedIngredients = ingredientsInput.value
    .split(',')
    .map(i => i.trim())
    .filter(i => i);

  try {
    const res = await fetch(
      store.server_domain + '/recipes/CreateNewRecipe',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form.value),
        credentials: 'include'
      }
    );

    let data = {};
    if (res.ok) {
      data = await res.json();
    } else {
      data = { success: false, message: 'Failed to create recipe.' };
    }

    message.value = data.message;
    success.value = data.success;
    if (data.success) {
      form.value = {
        title: '',
        image_url: '',
        prep_time: 0,
        servings: 1,
        instructions: '',
        extendedIngredients: [],
        likes_count: 0,
        is_vegan: false,
        is_vegetarian: false,
        is_gluten_free: false
      };
      ingredientsInput.value = '';
    }
  } catch (err) {
    message.value = 'Error submitting recipe.';
    success.value = false;
  }
};
</script>

<style scoped>
.create-recipe-page {
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 16px rgba(0,0,0,0.08);
  padding: 2rem 2.5rem;
  max-width: 600px;
  margin: 2rem auto;
}

.create-recipe-page h2 {
  text-align: center;
  margin-bottom: 2rem;
  color: #2c3e50;
  font-weight: 700;
}

.form-label {
  font-weight: 500;
  color: #34495e;
}

.form-control, textarea.form-control {
  border-radius: 6px;
  border: 1px solid #d1d5db;
  transition: border-color 0.2s;
}

.form-control:focus, textarea.form-control:focus {
  border-color: #007bff;
  box-shadow: 0 0 0 2px rgba(0,123,255,0.1);
}

.btn-primary {
  background: linear-gradient(90deg, #007bff 60%, #0056b3 100%);
  border: none;
  border-radius: 6px;
  padding: 0.5rem 2rem;
  font-weight: 600;
  letter-spacing: 0.5px;
  transition: background 0.2s;
}

.btn-primary:hover {
  background: linear-gradient(90deg, #0056b3 60%, #007bff 100%);
}

.form-check-label {
  margin-left: 0.5rem;
  color: #555;
}

.alert {
  border-radius: 6px;
  font-weight: 500;
  text-align: center;
}

.alert-success {
  background: #e6ffed;
  color: #218838;
  border: 1px solid #b7f5c2;
}

.alert-danger {
  background: #ffeaea;
  color: #c82333;
  border: 1px solid #f5b7b7;
}
</style>