<template>
  <div>
    <div class="d-flex justify-content-between align-items-center mb-3">
      <button @click="prevWeek" class="btn btn-outline-secondary">
        Előző hét
      </button>
      <h2>{{ formattedWeek }}</h2>
      <button @click="nextWeek" class="btn btn-outline-secondary">
        Következő hét
      </button>
    </div>

    <table class="table table-bordered">
      <thead>
        <tr>
          <th>Nap</th>
          <th v-for="day in weekDays" :key="day.date" class="text-center">
            {{ day.dayName }}<br />
            <small>{{ day.formattedDate }}</small>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th>Munkaóra</th>
          <td
            v-for="day in weekDays"
            :key="day.date"
            class="text-center"
            :class="{
              'worked-day': day.hoursWorked,
              'holiday-day': day.isHoliday,
            }"
          >
            {{ day.hoursWorked || "-" }}
          </td>
        </tr>
        <tr>
          <th>Leírás</th>
          <td
            v-for="day in weekDays"
            :key="day.date"
            class="text-center"
            :class="{
              'worked-day': day.hoursWorked,
              'holiday-day': day.isHoliday,
            }"
          >
            {{ day.description || "-" }}
          </td>
        </tr>
        <tr>
          <th>Projekt/Tag</th>
          <td
            v-for="day in weekDays"
            :key="day.date"
            class="text-center"
            :class="{
              'worked-day': day.hoursWorked,
              'holiday-day': day.isHoliday,
            }"
          >
            {{ day.projectTag || "-" }}
          </td>
        </tr>
        <tr>
          <th>Heti összes munkaóra</th>
          <td :colspan="weekDays.length" class="text-center font-weight-bold">
            {{ totalWeeklyHours }} óra
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import {
  format,
  startOfWeek,
  endOfWeek,
  addWeeks,
  eachDayOfInterval,
  isSameDay,
  parse,
  differenceInMinutes,
} from "date-fns";
import { hu } from "date-fns/locale";

export default {
  name: "AppWeeklyView",
  props: {
    entries: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      currentWeek: new Date(),
    };
  },
  computed: {
    formattedWeek() {
      const start = format(
        startOfWeek(this.currentWeek, { locale: hu }),
        "MMMM d",
        { locale: hu }
      );
      const end = format(
        endOfWeek(this.currentWeek, { locale: hu }),
        "MMMM d",
        { locale: hu }
      );
      return `${start} - ${end}`;
    },
    weekDays() {
      const startOfCurrentWeek = startOfWeek(this.currentWeek, { locale: hu });
      const endOfCurrentWeek = endOfWeek(this.currentWeek, { locale: hu });
      const days = eachDayOfInterval({
        start: startOfCurrentWeek,
        end: endOfCurrentWeek,
      });

      return days.map((day) => {
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
          dayName: format(day, "EEEE", { locale: hu }),
          formattedDate: format(day, "yyyy-MM-dd"),
          hoursWorked,
          description: entry ? entry.description : null,
          projectTag: entry ? entry.projectTag : null,
          isHoliday: entry ? entry.isHoliday : false,
        };
      });
    },
    totalWeeklyHours() {
      return this.weekDays
        .reduce((total, day) => total + (parseFloat(day.hoursWorked) || 0), 0)
        .toFixed(2);
    },
  },
  methods: {
    prevWeek() {
      this.currentWeek = addWeeks(this.currentWeek, -1);
    },
    nextWeek() {
      this.currentWeek = addWeeks(this.currentWeek, 1);
    },
  },
};
</script>

<style scoped>
.table th,
.table td {
  vertical-align: middle;
  text-align: center;
}

.worked-day {
  background-color: #fff3cd;
}

.holiday-day {
  background-color: #d4edda;
}

.font-weight-bold {
  font-weight: bold;
}
</style>
