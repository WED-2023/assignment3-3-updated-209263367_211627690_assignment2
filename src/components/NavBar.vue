<template>
  <b-navbar toggleable="lg" type="light" variant="light" class="shadow-sm mb-4" style="border-radius: 12px;">
    <b-navbar-brand to="/" class="fw-bold" style="font-size: 1.5rem;">
      🍲 
    </b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav class="me-auto">
        <b-nav-item :to="{ name: 'main' }">Recipes</b-nav-item>
        <b-nav-item :to="{ name: 'search' }">Search</b-nav-item>
        <b-nav-item :to="{ name: 'about' }">About</b-nav-item>
      </b-navbar-nav>

      <b-navbar-nav class="ms-auto align-items-center">
        <!-- Guest -->
        <template v-if="!store.username">
          <span class="navbar-text me-3">Hello Guest</span>
          <b-nav-item :to="{ name: 'login' }" class="me-2">Login</b-nav-item>
          <b-nav-item :to="{ name: 'register' }" class="me-2">Register</b-nav-item>
        </template>

        <!-- Logged in -->
        <template v-else>
          <span class="navbar-text fw-bold me-3">
            Hello, {{ store.firstname || store.username }}
          </span>
          <b-nav-item-dropdown text="Personal Area" right class="me-2">
            <b-dropdown-item @click="goTo('favorites')">My Favorite Recipes</b-dropdown-item>
            <b-dropdown-item @click="goTo('myRecipes')">My Recipes</b-dropdown-item>
            <b-dropdown-item @click="goTo('familyRecipes')">My Family Recipes</b-dropdown-item>
          </b-nav-item-dropdown>
          <b-nav-item :to="{ name: 'createRecipe' }" class="me-2">Create New Recipe</b-nav-item>
          <b-button variant="outline-danger" size="sm" @click="logout" class="ms-2">
            Logout
          </b-button>
        </template>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
import { getCurrentInstance } from 'vue';

export default {
  name: "NavBar",
  setup() {
    const internalInstance = getCurrentInstance();
    const store = internalInstance.appContext.config.globalProperties.store;

    const logout = () => {
      store.logout();
      window.toast('Logged out', 'You have been logged out.', 'info');
      window.router.push('/login');
    };

    const goTo = (tab) => {
      switch (tab) {
        case 'favorites':
          window.router.push('/my-favorites');
          break;
        case 'myRecipes':
          window.router.push('/my-recipes');
          break;
        case 'familyRecipes':
          window.router.push('/my-family-recipes');
          break;
      }
    };

    return { store, logout, goTo };
  }
};
</script>

<style scoped>
.navbar-text {
  font-size: 1.1rem;
}
.b-navbar {
  background: linear-gradient(90deg, #f8fafc 0%, #e0e7ff 100%);
}
.b-nav-item, .b-nav-item-dropdown {
  font-weight: 500;
  font-size: 1.08rem;
}
.b-nav-item.active, .b-nav-item:active {
  color: #06b6d4 !important;
}
.b-nav-item:hover, .b-nav-item-dropdown:hover {
  color: #6366f1 !important;
}
</style>