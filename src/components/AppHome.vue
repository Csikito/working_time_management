<template>
  <AppToastNotification v-if="toastMessage" :message="toastMessage" />
  <div class="container">
    <div v-if="viewMode === 'monthly'" class="mb-3 mt-5 row">
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
    <div
      v-if="showEditModal"
      class="modal fade show"
      style="display: block; background-color: rgba(0, 0, 0, 0.6)"
    >
      <div class="modal-dialog">
        <div class="modal-content bg-secondary">
          <div class="modal-header">
            <h5 class="modal-title">Munkaidő Bejegyzés Szerkesztése</h5>
            <button
              type="button"
              class="btn-close"
              @click="showEditModal = false"
            ></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="updateWorkEntry">
              <div class="mb-3">
                <label for="date" class="form-label">Dátum</label>
                <input
                  type="date"
                  id="date"
                  class="form-control"
                  v-model="selectedEntry.date"
                  required
                />
              </div>
              <div class="mb-3">
                <label for="start-time" class="form-label">Kezdési Idő</label>
                <input
                  type="time"
                  id="start-time"
                  class="form-control"
                  v-model="selectedEntry.startTime"
                  :disabled="selectedEntry.isHoliday"
                  required
                />
              </div>
              <div class="mb-3">
                <label for="end-time" class="form-label">Befejezési Idő</label>
                <input
                  type="time"
                  id="end-time"
                  class="form-control"
                  v-model="selectedEntry.endTime"
                  :disabled="selectedEntry.isHoliday"
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
                  v-model="selectedEntry.description"
                  :disabled="selectedEntry.isHoliday"
                  required
                ></textarea>
              </div>
              <div class="mb-3">
                <label for="project-tag" class="form-label">Projekt/Tag</label>
                <input
                  type="text"
                  id="project-tag"
                  class="form-control"
                  v-model="selectedEntry.projectTag"
                  :disabled="selectedEntry.isHoliday"
                />
              </div>
              <div class="form-check mb-3">
                <input
                  class="form-check-input"
                  type="checkbox"
                  id="holidayCheck"
                  v-model="selectedEntry.isHoliday"
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
      <AppDailyView
        v-if="viewMode === 'daily'"
        :entries="filteredEntries"
        @edit-entry="editEntry"
        @delete-entry="deleteEntry"
      />
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
import {
  addWorkEntry,
  getAllWorkEntries,
  updateWorkEntry,
  deleteWorkEntry,
} from "../data/db.js";
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
      showEditModal: false,
      selectedEntry: null,
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

      if (this.isHoliday || this.startTime < this.endTime) {
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
      } else {
        this.showToast(
          `Kezdési idő nem lehet később mint a befejezési idő. ( ${this.startTime} - ${this.endTime} )`
        );
      }
    },

    showToast(message) {
      this.toastMessage = message;
      setTimeout(() => {
        this.toastMessage = "";
      }, 5000);
    },

    editEntry(entry) {
      this.selectedEntry = JSON.parse(JSON.stringify(entry));
      this.showEditModal = true;
    },

    async deleteEntry(id) {
      await deleteWorkEntry(id);
      this.fetchEntries();
      this.showToast("Bejegyzés törölve!");
    },

    async updateWorkEntry() {
      const entryToUpdate = JSON.parse(JSON.stringify(this.selectedEntry));
      await updateWorkEntry(entryToUpdate);
      this.showEditModal = false;
      this.fetchEntries();
      this.showToast("Bejegyzés módosítva!");
    },
  },
  computed: {
    filteredEntries() {
      let entries = this.entries;

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
