<template>
  <div>
    <div class="d-flex justify-content-between align-items-center mb-3">
      <button @click="prevMonth" class="btn btn-outline-secondary">
        Előző
      </button>
      <h2>{{ formattedMonth }}</h2>
      <button @click="nextMonth" class="btn btn-outline-secondary">
        Következő
      </button>
    </div>

    <div class="week-days">
      <div v-for="day in weekDays" :key="day" class="day-header">{{ day }}</div>
    </div>

    <div class="grid">
      <div v-for="(day, index) in paddedDays" :key="index" class="grid-item">
        <div
          v-if="day"
          class="card day-card"
          :class="{
            holiday: day.isHoliday,
            worked: day.hoursWorked,
            today: day.isToday,
          }"
        >
          <div class="card-body">
            <h6>{{ day.formattedDate }}</h6>
            <p v-if="day.isHoliday">Szabadság</p>
            <p v-else-if="day.hoursWorked">
              Munkaidő: {{ day.hoursWorked }} óra
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  format,
  startOfMonth,
  endOfMonth,
  addMonths,
  eachDayOfInterval,
  isSameDay,
  startOfWeek,
  addDays,
  getDay,
  parse,
  differenceInMinutes,
} from "date-fns";
import { hu } from "date-fns/locale";
export default {
  name: "AppMontlyView",
  props: {
    entries: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      currentMonth: new Date(),
      today: new Date(),
    };
  },
  computed: {
    formattedMonth() {
      return format(this.currentMonth, "MMMM yyyy", { locale: hu });
    },
    weekDays() {
      const start = startOfWeek(this.currentMonth, { locale: hu });
      return Array.from({ length: 7 }).map((_, i) =>
        format(addDays(start, i), "EEEE", { locale: hu })
      );
    },
    formattedDays() {
      const start = startOfMonth(this.currentMonth);
      const end = endOfMonth(this.currentMonth);
      const days = eachDayOfInterval({ start, end });

      return days.map((day) => {
        console.log(this.entries);
        const entry = this.entries.find((e) =>
          isSameDay(new Date(e.date), day)
        );

        let hoursWorked = null;
        if (entry && entry.startTime && entry.endTime) {
          const startDateTime = parse(entry.startTime, "HH:mm", new Date(day));
          const endDateTime = parse(entry.endTime, "HH:mm", new Date(day));
          const minutesWorked = differenceInMinutes(endDateTime, startDateTime);
          hoursWorked = (minutesWorked / 60).toFixed(2);
        }

        return {
          date: day,
          formattedDate: format(day, "d"),
          hoursWorked,
          isHoliday: entry ? entry.isHoliday : false,
          isToday: isSameDay(day, this.today),
        };
      });
    },
    paddedDays() {
      const firstDayOfMonth = startOfMonth(this.currentMonth);
      const startDayOfWeek = getDay(firstDayOfMonth);

      const paddedDays = Array.from({ length: startDayOfWeek }).fill(null);
      paddedDays.push(...this.formattedDays);

      return paddedDays;
    },
  },
  methods: {
    prevMonth() {
      this.currentMonth = addMonths(this.currentMonth, -1);
    },
    nextMonth() {
      this.currentMonth = addMonths(this.currentMonth, 1);
    },
  },
};
</script>

<style scoped>
.week-days {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  text-align: center;
  font-weight: bold;
  margin-bottom: 10px;
}

.grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 10px;
}

.grid-item {
  min-height: 100px;
}

.day-card {
  height: 100%;
}

.day-card .card-body {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.holiday {
  background-color: #d4edda;
}

.worked {
  background-color: #ffecb3;
}

.today {
  background-color: #cce5ff;
  border: 2px solid #0056b3;
}
</style>
