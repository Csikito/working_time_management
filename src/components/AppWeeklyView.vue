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
        // Az adott naphoz tartozó összes bejegyzés kiszűrése
        const dailyEntries = this.entries.filter((e) =>
          isSameDay(new Date(e.date), day)
        );

        // Összesített munkaóra, leírások, projektek összegyűjtése
        let totalMinutesWorked = 0;
        const descriptionsSet = new Set();
        const projectTagsSet = new Set();
        let isHoliday = false;

        dailyEntries.forEach((entry) => {
          if (entry.startTime && entry.endTime) {
            const startDateTime = parse(
              entry.startTime,
              "HH:mm",
              new Date(day)
            );
            const endDateTime = parse(entry.endTime, "HH:mm", new Date(day));
            totalMinutesWorked += differenceInMinutes(
              endDateTime,
              startDateTime
            );
          }

          if (entry.description) {
            descriptionsSet.add(entry.description.trim());
          }

          if (entry.projectTag) {
            projectTagsSet.add(entry.projectTag.trim());
          }

          if (entry.isHoliday) {
            isHoliday = true;
          }
        });

        const hours = Math.floor(totalMinutesWorked / 60);
        const minutes = totalMinutesWorked % 60;
        const formattedHoursWorked =
          totalMinutesWorked > 0
            ? `${hours}:${minutes.toString().padStart(2, "0")}`
            : null;

        return {
          date: day,
          dayName: format(day, "EEEE", { locale: hu }),
          formattedDate: format(day, "yyyy-MM-dd"),
          hoursWorked: formattedHoursWorked,
          description: Array.from(descriptionsSet).join(", "),
          projectTag: Array.from(projectTagsSet).join(", "),
          isHoliday,
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
