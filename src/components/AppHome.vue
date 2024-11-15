<template>
  <div class="container">
    <div class="buttons row mt-5">
      <div class="btn-group mb-3 col-sm d-inline-block" role="group">
        <button class="btn btn-secondary" @click="viewMode = 'daily'">
          Napi
        </button>
        <button class="btn btn-secondary" @click="viewMode = 'weekly'">
          Heti
        </button>
        <button class="btn btn-secondary" @click="viewMode = 'monthly'">
          Havi
        </button>
      </div>
      <div class="col">
        <button class="btn btn-success" @click="showModal = true">
          Munkaidő Hozzáadása
        </button>
      </div>
    </div>

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
                <label for="date" class="form-label">Dátum</label>
                <input
                  type="date"
                  id="date"
                  class="form-control"
                  v-model="date"
                  required
                />
              </div>
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
    <div class="view-tables mt-5">
      <AppDailyView v-if="viewMode === 'daily'" :entries="filteredEntries" />
      <AppWeeklyView
        v-else-if="viewMode === 'weekly'"
        :entries="filteredEntries"
      />
      <AppMonthlyView
        v-else-if="viewMode === 'monthly'"
        :entries="filteredEntries"
      />
    </div>
  </div>
</template>

<script>
import AppDailyView from "./AppDailyView.vue";
import AppWeeklyView from "./AppWeeklyView.vue";
import AppMonthlyView from "./AppMonthlyView.vue";

export default {
  name: "AppHome",
  components: {
    AppDailyView,
    AppWeeklyView,
    AppMonthlyView,
  },
  data() {
    return {
      showModal: false,
      date: "",
      startTime: "",
      endTime: "",
      description: "",
      projectTag: "",
      isHoliday: false,
      viewMode: "daily",
      entries: [],
    };
  },

  methods: {
    addWorkTime() {
      const workEntry = {
        date: this.date,
        startTime: this.isHoliday ? null : this.startTime,
        endTime: this.isHoliday ? null : this.endTime,
        description: this.isHoliday ? null : this.description,
        projectTag: this.projectTag ? "#Szabadság" : this.projectTag,
        isHoliday: this.isHoliday,
      };
      console.log("Új Munkaidő Bejegyzés:", workEntry);

      this.showModal = false;
      this.date = "";
      this.startTime = "";
      this.endTime = "";
      this.description = "";
      this.projectTag = "";
      this.isHoliday = false;
    },
  },
  omputed: {
    filteredEntries() {
      return this.entries;
    },
  },
};
</script>

<style scoped></style>
