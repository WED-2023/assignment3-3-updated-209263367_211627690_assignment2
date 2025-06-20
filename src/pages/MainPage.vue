<template>
  <div class="container main-container">
    <h1 class="title gradient-text">Main Page</h1>

    <div class="d-flex justify-content-end mb-3" v-if="store.username">
      <button class="btn btn-danger logout-btn" @click="logout">
        <i class="bi bi-box-arrow-right"></i> Logout
      </button>
    </div>

    <RecipePreviewList title="Random Recipes" class="RandomRecipes center" />

    <div v-if="!store.username" class="text-center mt-4">
      <router-link :to="{ name: 'login' }">
        <button class="btn btn-primary pulse-btn">You need to Login to view this</button>
      </router-link>
    </div>

    <RecipePreviewList
      title="Last Viewed Recipes"
      :class="{
        RandomRecipes: true,
        blur: !store.username,
        center: true
      }"
      disabled
    />
  </div>
</template>

<script>
import { getCurrentInstance } from 'vue';
import RecipePreviewList from "../components/RecipePreviewList.vue";

export default {
  components: {
    RecipePreviewList
  },
  setup() {
    const internalInstance = getCurrentInstance();
    const store = internalInstance.appContext.config.globalProperties.store;

    const logout = () => {
      store.logout();
      window.toast('Logged out', 'You have been logged out.', 'info');
      window.router.push('/login');
    };

    return { store, logout };
  }
};
</script>

<style lang="scss" scoped>
.main-container {
  background: linear-gradient(135deg, #f8fafc 0%, #e0e7ff 100%);
  border-radius: 18px;
  box-shadow: 0 6px 32px rgba(60, 72, 88, 0.12);
  padding: 32px 24px 24px 24px;
  margin-top: 30px;
}

.title {
  font-family: 'Segoe UI', 'Roboto', Arial, sans-serif;
  font-weight: 700;
  font-size: 2.5rem;
  margin-bottom: 24px;
  letter-spacing: 1px;
  text-align: center;
}

.gradient-text {
  background: linear-gradient(90deg, #6366f1 0%, #06b6d4 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.logout-btn {
  font-weight: 600;
  letter-spacing: 0.5px;
  transition: background 0.2s, box-shadow 0.2s;
  box-shadow: 0 2px 8px rgba(220, 38, 38, 0.08);
}

.logout-btn:hover {
  background: #b91c1c;
  color: #fff;
  box-shadow: 0 4px 16px rgba(220, 38, 38, 0.16);
}

.pulse-btn {
  animation: pulse 1.2s infinite;
  font-weight: 600;
  letter-spacing: 0.5px;
}

@keyframes pulse {
  0% { box-shadow: 0 0 0 0 rgba(59,130,246,0.5); }
  70% { box-shadow: 0 0 0 10px rgba(59,130,246,0); }
  100% { box-shadow: 0 0 0 0 rgba(59,130,246,0); }
}

.RandomRecipes {
  margin: 10px 0 10px;
}

.blur {
  -webkit-filter: blur(5px); /* Safari 6.0 - 9.0 */
  filter: blur(2px);
  opacity: 0.7;
  transition: filter 0.3s, opacity 0.3s;
}
::v-deep .blur .recipe-preview {
  pointer-events: none;
  cursor: default;
}
</style>