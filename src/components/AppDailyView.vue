<template>
  <div>
    <h2>Napi Munkaidő</h2>
    <table class="table">
      <thead>
        <tr>
          <th>Dátum</th>
          <th>Kezdés</th>
          <th>Befejezés</th>
          <th>Leírás</th>
          <th>Projekt/Tag</th>
          <th>Szabadság</th>
          <th>Műveletek</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="entry in entries"
          :key="entry.id"
          :class="{ 'table-success': entry.isHoliday }"
        >
          <td>{{ entry.date }}</td>
          <td>{{ entry.startTime }}</td>
          <td>{{ entry.endTime }}</td>
          <td>{{ entry.description }}</td>
          <td>{{ entry.projectTag }}</td>
          <td>{{ entry.isHoliday ? "Igen" : "Nem" }}</td>
          <td>
            <button
              class="btn btn-link p-0 me-2"
              @click="$emit('edit-entry', entry)"
            >
              <i class="bi bi-pencil-square"></i>
              <!-- Szerkesztés ikon -->
            </button>
            <button
              class="btn btn-link p-0 text-danger"
              @click="$emit('delete-entry', entry.id)"
            >
              <i class="bi bi-trash"></i>
              <!-- Törlés ikon -->
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "AppDailyView",
  props: {
    entries: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style scoped></style>
