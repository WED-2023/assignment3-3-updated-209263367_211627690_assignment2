<template>
  <b-navbar toggleable="lg" type="light" variant="light" class="shadow-sm mb-4" style="border-radius: 12px;">
    <b-navbar-brand href="#" class="fw-bold" style="font-size: 1.5rem;" @click.prevent="goToRoute('main')">
      🍲 Recipes
    </b-navbar-brand>
    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav class="me-auto">
        <b-nav-item href="#" @click.prevent="goToRoute('main')">Recipes</b-nav-item>
        <b-nav-item href="#" @click.prevent="goToRoute('search')">Search</b-nav-item>
        <b-nav-item href="#" @click.prevent="goToRoute('about')">About</b-nav-item>
      </b-navbar-nav>
      <b-navbar-nav class="ms-auto align-items-center">
        <template v-if="!store.username">
          <span class="navbar-text me-3">Hello Guest</span>
          <b-nav-item href="#" @click.prevent="goToRoute('login')" class="me-2">Login</b-nav-item>
          <b-nav-item href="#" @click.prevent="goToRoute('register')" class="me-2">Register</b-nav-item>
        </template>
        <template v-else>
          <span class="navbar-text fw-bold me-3">
            Hello, {{ store.username }}
          </span>
          <!-- BootstrapVue 3 Dropdown -->
          <b-dropdown
            id="personal-dropdown"
            text="Personal"
            class="me-2"
            variant="link"
            toggle-class="p-0"
            style="font-weight: 500; font-size: 1.08rem;"
          >
            <b-dropdown-item @click="goTo('myFavorites')">Favorites</b-dropdown-item>
            <b-dropdown-item @click="goTo('myRecipes')">My Recipes</b-dropdown-item>
            <b-dropdown-item @click="goTo('myFamilyRecipes')">Family Recipes</b-dropdown-item>
          </b-dropdown>
          <b-nav-item href="#" @click.prevent="goToRoute('createRecipe')" class="me-2">Create New Recipe</b-nav-item>
          <b-nav-item href="#" @click.prevent="goToRoute('familyManager')" class="me-2">My Family Manager</b-nav-item>
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
        case 'myFavorites':
          window.router.push({ name: 'myFavorites' }); // <-- Fix here
          break;
        case 'myRecipes':
          window.router.push({ name: 'myRecipes' });
          break;
        case 'myFamilyRecipes':
          window.router.push({ name: 'myFamilyRecipes' });
          break;
      }
    };

    const goToRoute = (name) => {
      window.router.push({ name });
    };

    return { store, logout, goTo, goToRoute };
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