<template>
  <AppToastNotification v-if="toastMessage" :message="toastMessage" />
  <div class="container">
    <div class="mb-3 mt-5 row">
      <input
        v-model="projectTagFilter"
        class="form-control"
        type="text"
        placeholder="Szűrés Projekt/Tag alapján"
      />
    </div>
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
import { addWorkEntry, getAllWorkEntries } from "../data/db.js";
import AppDailyView from "./AppDailyView.vue";
import AppWeeklyView from "./AppWeeklyView.vue";
import AppMonthlyView from "./AppMonthlyView.vue";
import AppToastNotification from "./AppToastNotification.vue";

export default {
  name: "AppHome",
  components: {
    AppDailyView,
    AppWeeklyView,
    AppMonthlyView,
    AppToastNotification,
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
      projectTagFilter: "",
      entries: [],
      toastMessage: "",
    };
  },
  created() {
    this.fetchEntries();
  },

  methods: {
    async fetchEntries() {
      this.entries = await getAllWorkEntries();
    },

    async addWorkTime() {
      const workEntry = {
        date: this.date,
        startTime: this.isHoliday ? null : this.startTime,
        endTime: this.isHoliday ? null : this.endTime,
        description: this.isHoliday ? null : this.description,
        projectTag: this.isHoliday ? "#Szabadság" : this.projectTag,
        isHoliday: this.isHoliday,
      };

      await addWorkEntry(workEntry);

      this.showModal = false;
      this.date = "";
      this.startTime = "";
      this.endTime = "";
      this.description = "";
      this.projectTag = "";
      this.isHoliday = false;

      this.fetchEntries();

      this.showToast("Munkaidő bejegyzés sikeresen hozzáadva!");
    },

    showToast(message) {
      this.toastMessage = message;
      setTimeout(() => {
        this.toastMessage = "";
      }, 5000);
    },
  },
  computed: {
    filteredEntries() {
      const today = new Date();
      let entries = this.entries;

      if (this.viewMode === "daily") {
        entries = entries.filter(
          (entry) =>
            new Date(entry.date).toDateString() === today.toDateString()
        );
      } else if (this.viewMode === "weekly") {
        const startOfWeek = new Date(
          today.setDate(today.getDate() - today.getDay())
        );
        const endOfWeek = new Date(today.setDate(startOfWeek.getDate() + 6));
        entries = entries.filter((entry) => {
          const entryDate = new Date(entry.date);
          return entryDate >= startOfWeek && entryDate <= endOfWeek;
        });
      } else if (this.viewMode === "monthly") {
        const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
        const endOfMonth = new Date(
          today.getFullYear(),
          today.getMonth() + 1,
          0
        );
        entries = entries.filter((entry) => {
          const entryDate = new Date(entry.date);
          return entryDate >= startOfMonth && entryDate <= endOfMonth;
        });
      }

      if (this.projectTagFilter) {
        entries = entries.filter((entry) =>
          entry.projectTag
            .toLowerCase()
            .includes(this.projectTagFilter.toLowerCase())
        );
      }
      return entries;
    },
  },
};
</script>

<style scoped></style>
