<template>
  <ListLayout v-bind="props" />
</template>

<script lang="ts" setup>
import ListLayout from "@/views/pages/page-layout/ListLayout.vue"
import router from "@/router"
import { ref, onMounted } from "vue"
import { mapActions, useStore } from 'vuex'

const loading = ref(false)

const { fetchFleets } = mapActions('vehicleModule', ['fetchFleets'])

const store = useStore()

onMounted(async () => {
  try {
    loading.value = true
    await store.dispatch("fetchFleets")
  } catch (err) {
    console.error('Error dispatching fetchFleet action:', err)
  } finally {
    loading.value = false
  }
})

const items = ref(store.getters.fleets) 

console.log(items.value)


const headers = [
  { text: "Fleet Number", value: "fltFleetNo", sortable: true },
  { text: "Plate Number", value: "fltPlateNo", sortable: true },
  { text: "Make", value: "fltMake", sortable: true },
  { text: "Model", value: "fltModel", sortable: true },
  { text: "Year", value: "fltYear", sortable: true },
  { text: "Capacity", value: "fltCapacity", sortable: true },
  { text: "Axle Number", value: "fltAxleNo", sortable: true },
  { text: "Truck Chassis Number", value: "fltTrkChasNo", sortable: true },
  { text: "Truck Engine Number", value: "fltTrkEngineNo", sortable: true },
  { text: "Active Status", value: "fltActive", sortable: true },
]

const registerForm = () => {
  router.push({ name: "register-trucks" })
}





const props = {
  header: "Fleet",
  subheader: "This is a list of Fleet registered in the system.",
  button: {
    text: "Add Fleet",
    to: "/register-fleet",
  },
  tableHeader: {
    headers,
    items,
  },
  loading: loading.value,
}
</script>
