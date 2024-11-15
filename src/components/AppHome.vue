<template>
  <div>
    <h1>Home</h1>
    <button class="btn btn-success mt-3" @click="showModal = true">
      Munkaidő Hozzáadása
    </button>
    <div
      v-if="showModal"
      class="modal fade show"
      style="display: block; background-color: rgba(0, 0, 0, 0.6)"
    >
      <div class="modal-dialog">
        <div class="modal-content bg-secondary">
          <div class="modal-header">
            <h5 class="modal-title">Új Munkaidő Bejegyzés</h5>
            <button
              type="button"
              class="btn-close"
              @click="showModal = false"
            ></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="addWorkTime">
              <div class="mb-3">
                <label for="start-time" class="form-label">Kezdési Idő</label>
                <input
                  type="time"
                  id="start-time"
                  class="form-control"
                  v-model="startTime"
                  :disabled="isHoliday"
                  required
                />
              </div>
              <div class="mb-3">
                <label for="end-time" class="form-label">Befejezési Idő</label>
                <input
                  type="time"
                  id="end-time"
                  class="form-control"
                  v-model="endTime"
                  :disabled="isHoliday"
                  required
                />
              </div>
              <div class="mb-3">
                <label for="description" class="form-label"
                  >Feladat Leírása</label
                >
                <textarea
                  id="description"
                  class="form-control"
                  v-model="description"
                  :disabled="isHoliday"
                  required
                ></textarea>
              </div>
              <div class="mb-3">
                <label for="project-tag" class="form-label">Projekt/Tag</label>
                <input
                  type="text"
                  id="project-tag"
                  class="form-control"
                  v-model="projectTag"
                  :disabled="isHoliday"
                />
              </div>
              <div class="form-check mb-3">
                <input
                  class="form-check-input"
                  type="checkbox"
                  id="holidayCheck"
                  v-model="isHoliday"
                />
                <label class="form-check-label" for="holidayCheck"
                  >Szabadság</label
                >
              </div>
              <button type="submit" class="btn btn-success">Mentés</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AppHome",
  data() {
    return {
      showModal: false,
      startTime: "",
      endTime: "",
      description: "",
      projectTag: "",
      isHoliday: false,
    };
  },
  methods: {
    addWorkTime() {
      const workEntry = {
        startTime: this.isHoliday ? null : this.startTime,
        endTime: this.isHoliday ? null : this.endTime,
        description: this.isHoliday ? "Szabadság" : this.description,
        projectTag: this.projectTag,
        isHoliday: this.isHoliday,
      };
      console.log("Új Munkaidő Bejegyzés:", workEntry);

      this.showModal = false;
      this.startTime = "";
      this.endTime = "";
      this.description = "";
      this.projectTag = "";
      this.isHoliday = false;
    },
  },
};
</script>

<style scoped></style>
