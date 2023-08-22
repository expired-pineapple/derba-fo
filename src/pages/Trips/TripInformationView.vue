<template>
  <ListLayout v-bind="props" />
</template>

<script lang="ts" setup>
import ListLayout from "@/views/pages/page-layout/ListLayout.vue"
import router from "@/router"
import { ref, onMounted } from "vue"
import { useStore } from 'vuex'

  
const headers = [
  {
    text: "Origin",
    value: "trpOrigin",
  },
  {
    text: "Destination",
    value: "trpDestination",
  },
  {
    text: "Distance",
    value: "trpDistanceKm",
  },
  {
    text: "Route Name",
    value: "trpRouteName",
  },
  {
    text: "Turnaround Time",
    value: "trpTurnaroundTime",
  },
  {
    text: "Average Fuel",
    value: "trpAvrgFuel",
  },
  {
    text: "Days",
    value: "trpDays",
  },
  {
    text: "Ltr",
    value: "trpLBltr",
  },
  {
    text: "Rltr",
    value: "trpRltr",
  },
  {
    text: "Sltr",
    value: "trpSltr",
  },
  {
    text: "Tltr",
    value: "trpTltr",
  },
  {
    text: "Ultr",
    value: "trpUltr",
  },
]

const store = useStore()

const items = ref([])

const loading = ref(true)

const edit = clickedRow => {
  console.log(clickedRow)
  router.push(`/trip-information/${clickedRow.id}`)
}

onMounted(async () => {
  try {
    await store.dispatch("fetchRoutes")
    items.value = store.getters.routes
  } catch (err) {
    console.error('Error dispatching fetchTrailers action:', err)
  } finally {
    loading.value = !loading.value
  }
})


const props = {
  header: "Routes",
  subheader: "This is a list of routes registered in the system.",
  button: {
    text: "Add Routes",
    to: "/trip-form",
  },
  tableHeader: {
    headers,
    items,
  },
  clickedRow: edit,
}
</script>
