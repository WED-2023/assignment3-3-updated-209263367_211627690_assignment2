<template>
  <div id="app">
    <NavBar />
    <router-view />
  </div>
</template>

<script>
import { getCurrentInstance } from 'vue';
import NavBar from './components/NavBar.vue';

export default {
  name: "App",
  components: { NavBar },
  setup() {
    const internalInstance = getCurrentInstance();
    const store = internalInstance.appContext.config.globalProperties.store;
    const toast = internalInstance.appContext.config.globalProperties.toast;
    const router = internalInstance.appContext.config.globalProperties.$router;

    const logout = () => {
      store.logout();
      toast("Logout", "User logged out successfully", "success");
      router.push("/").catch(() => {});
    };

    return { store, logout };
  }
}
</script>

<style lang="scss">
@use "@/scss/form-style.scss" as *;

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  min-height: 100vh;
}
</style>