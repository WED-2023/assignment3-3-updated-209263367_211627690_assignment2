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
        // Replace with your backend endpoint for full recipe details
        const response = await axios.get(
          `${store.server_domain}/recipes/full/${route.value.params.id}`,
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
    watch(() => route.value.params.id, fetchRecipe);

    return { recipe, loading, startCooking };
  }
};
</script>