<script>
import axios from "axios";
import { getCurrentInstance, ref, onMounted, watch } from "vue";

export default {
  name: "RecipeDetails",
  setup() {
    const route = window.router.currentRoute;
    const recipe = ref({});
    const loading = ref(true);
    const store = getCurrentInstance().appContext.config.globalProperties.store;

    async function fetchRecipe() {
      loading.value = true;
      try {
        const user_id = store.username || null;
        // Use the correct param name: recipeId
        const response = await axios.get(
          `${store.server_domain}/recipes/${route.value.params.recipeId}`,
          { params: { user_id } }
        );
        recipe.value = response.data;
      } catch (err) {
        recipe.value = { title: "Recipe not found" };
      }
      loading.value = false;
    }

    function startCooking() {
      window.toast("Let's cook!", "Enjoy your meal!", "success");
    }

    onMounted(fetchRecipe);
    watch(() => route.value.params.recipeId, fetchRecipe);

    return { recipe, loading, startCooking };
  }
};
</script>