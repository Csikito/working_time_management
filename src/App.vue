<template>
  <div>
    <AppNavbar />
    <AppHome />
  </div>
</template>

<script>
import AppHome from "./components/AppHome.vue";
import AppNavbar from "./components/AppNavbar.vue";

export default {
  name: "App",
  components: {
    AppNavbar,
    AppHome,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #fff;
}

body {
  background: #2c3e50;
}
</style>
