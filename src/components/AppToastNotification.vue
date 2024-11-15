<template>
  <div
    v-bind:class="{ show: visible }"
    class="toast align-items-center text-white border-0 m-0"
    role="alert"
    aria-live="assertive"
    aria-atomic="true"
    style="position: fixed; bottom: 1rem; right: 1rem; min-width: 200px"
  >
    <div class="toast-header bg-success text-white">
      <strong class="me-auto">Info</strong>
      <button
        type="button"
        class="btn-close btn-close-white me-2 m-auto"
        aria-label="Close"
        @click="visible = false"
      ></button>
    </div>
    <div class="toast-body">{{ message }}</div>
  </div>
</template>

<script>
export default {
  name: "ToastNotification",
  props: {
    message: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      visible: true,
    };
  },
  methods: {
    show() {
      this.visible = true;
      setTimeout(() => {
        this.visible = false;
      }, 5000);
    },
  },
  watch: {
    message() {
      this.show();
    },
  },
};
</script>

<style scoped>
.toast {
  position: fixed;
  bottom: 1rem;
  right: 2rem;
  min-width: 200px;
  transition: right 0.5s ease, opacity 0.5s ease;
  background-color: #1da164;
}
</style>
