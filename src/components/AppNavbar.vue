<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">Munkaidő Nyilvántartás</a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
          <ul class="navbar-nav">
            <li class="nav-item active">
              <a class="nav-link" href="#">Home</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Napi</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Heti</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Hónapi</a>
            </li>
          </ul>
        </div>
        <form class="d-flex" @submit.prevent="handleSearch">
          <input
            class="form-control me-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
          <button class="btn btn-outline-success" type="submit">Search</button>
        </form>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: "AppNavbar",
  data() {
    return {
      searchQuery: "",
    };
  },
  methods: {
    handleSearch() {
      console.log(this.searchQuery);
    },
  },
};
</script>

<style scoped></style>
