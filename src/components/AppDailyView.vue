<template>
  <div>
    <div class="header">
      <button @click="prevDay" class="btn btn-outline-secondary">
        Előző nap
      </button>
      <h2>{{ formattedDate }}</h2>
      <button @click="nextDay" class="btn btn-outline-secondary">
        Következő nap
      </button>
    </div>

    <div class="timeline">
      <div v-for="hour in hours" :key="hour" class="hour">
        <div class="time-label">{{ hour }}:00</div>
        <div class="events">
          <div
            v-for="event in eventsInCurrentHour(hour)"
            :key="event.id"
            class="event"
            :style="{
              top: `${eventTop(event.startTime)}px`,
              height: `${eventHeight(event.startTime, event.endTime)}px`,
              backgroundColor: event.isHoliday ? '#d4edda' : '#cce5ff',
            }"
          >
            <div class="event-actions">
              <button
                @click="$emit('edit-entry', event)"
                class="btn btn-sm btn-primary"
              >
                ✎
              </button>
              <button
                @click="$emit('delete-entry', event.id)"
                class="btn btn-sm btn-danger"
              >
                🗑
              </button>
            </div>

            <span
              >{{ formatTime(event.startTime) }} -
              {{ formatTime(event.endTime) }}</span
            ><br />
            <span>{{ event.description || "Nincs leírás" }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { format, addDays, isSameDay, parse } from "date-fns";
import { hu } from "date-fns/locale";

export default {
  name: "AppDailyView",
  props: {
    entries: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      currentDate: new Date(),
      hours: Array.from({ length: 24 }, (_, i) => i), // 0-23 órák
    };
  },
  computed: {
    formattedDate() {
      return format(this.currentDate, "EEEE, yyyy-MM-dd", { locale: hu });
    },
    dailyEvents() {
      const events = this.entries.filter((entry) =>
        isSameDay(new Date(entry.date), this.currentDate)
      );

      if (events.some((event) => event.isHoliday)) {
        events.push({
          id: "holiday",
          startTime: "08:00",
          endTime: "16:00",
          description: "Szabadság",
          isHoliday: true,
        });
      }

      return events;
    },
  },
  methods: {
    prevDay() {
      this.currentDate = addDays(this.currentDate, -1);
    },
    nextDay() {
      this.currentDate = addDays(this.currentDate, 1);
    },
    eventsInCurrentHour(hour) {
      return this.dailyEvents.filter((event) => {
        if (!event.startTime) return false;
        const start = parse(event.startTime, "HH:mm", this.currentDate);
        return start.getHours() === hour;
      });
    },
    eventTop(startTime) {
      if (!startTime) return 0;
      const start = parse(startTime, "HH:mm", this.currentDate);
      return (start.getMinutes() / 60) * 100;
    },
    eventHeight(startTime, endTime) {
      if (!startTime || !endTime) return 0;
      const start = parse(startTime, "HH:mm", this.currentDate);
      const end = parse(endTime, "HH:mm", this.currentDate);
      const durationInMinutes = (end - start) / 60000;
      return (durationInMinutes / 60) * 100;
    },
    formatTime(time) {
      if (!time) return "";
      return format(parse(time, "HH:mm", this.currentDate), "HH:mm");
    },
    editEvent(event) {
      console.log("Szerkesztés:", event);
    },
    deleteEvent(eventId) {
      console.log("Törlés:", eventId);
      this.$emit("delete-event", eventId);
    },
  },
};
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.timeline {
  display: grid;
  grid-template-columns: 50px 1fr;
  row-gap: 5px;
  border-left: 2px solid #ccc;
  position: relative;
}

.hour {
  display: contents;
}

.time-label {
  text-align: right;
  padding-right: 10px;
  font-weight: bold;
  color: #888;
}

.events {
  position: relative;
  height: 50px;
  border-top: 1px solid #eee;
}

.event {
  position: absolute;
  left: 0;
  width: 100%;
  color: white;
  padding: 5px;
  font-size: 0.8rem;
  border-radius: 4px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.event-actions {
  position: absolute;
  top: 5px;
  right: 5px;
  display: flex;
  gap: 5px;
}

.event[style*="background-color: #d4edda"] {
  color: black;
}
</style>
