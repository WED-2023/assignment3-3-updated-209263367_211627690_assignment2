import { createRouter, createWebHistory } from 'vue-router';
import Main from "../pages/MainPage.vue";
import NotFound from "../pages/NotFoundPage.vue";
import MyFavoritesPage from "../pages/MyFavoritesPage.vue";

const routes = [
  {
    path: "/",
    name: "main",
    component: Main,
  },
  {
    path: "/register",
    name: "register",
    component: () => import("../pages/RegisterPage.vue"),
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../pages/LoginPage.vue"),
  },
  {
    path: "/search",
    name: "search",
    component: () => import("../pages/SearchPage.vue"),
  },
  {
    path: "/about",
    name: "about",
    component: () => import("../pages/AboutPage.vue"),
  },
  {
    path: '/users/favorites',
    name: 'myFavorites', // <-- This must match!
    component: MyFavoritesPage
  },
  {
    path: "/my-recipes",
    name: "myRecipes",
    component: () => import("../pages/MyRecipesPage.vue"),
  },
  {
    path: "/my-family-recipes",
    name: "myFamilyRecipes",
    component: () => import("../pages/MyFamilyRecipesPage.vue"),
  },
  {
    path: "/createRecipe",
    name: "createRecipe",
    component: () => import("../pages/CreateRecipePage.vue"),
  },
  {
    path: "/recipe/:recipeId",
    name: "recipe",
    component: () => import("../pages/RecipeDetails.vue"),
  },
  {
    path: "/:catchAll(.*)",
    name: "notFound",
    component: NotFound,
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;