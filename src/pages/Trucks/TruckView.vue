<template>
  <ListLayout v-bind="props" />
</template>

<script lang="ts" setup>
import ListLayout from "@/views/pages/page-layout/ListLayout.vue"
import router from "@/router"
import { ref, onMounted } from "vue"
import { mapActions, useStore } from 'vuex'


const searchField = ref("")
const searchValue = ref("")
  

const store = useStore()

const loading = ref(true)

const { fetchDriverAssignedTrucks } = mapActions('vehicleModule', ['fetchDriverAssignedTrucks'])

const items = ref([])

onMounted(async () => {
  try {
    await store.dispatch("fetchTrucks")
    items.value = store.getters.trucks
  } catch (err) {
    console.error('Error dispatching fetchDriverAssignedTrucks action:', err)
  }finally{
    loading.value = !loading.value
  }
})


const headers = [
  { text: "Driver", value: "DrvId.driver_name", sortable: true, width: "150" },
  { text: "Fleet Number", value: "TrlId.fleet_number", sortable: true },
  { text: "Fleet Plate Number", value: "FltId.fltPlateNo", sortable: true },
  { text: "Trailer Plate Number", value: "TrlId.plate_number", sortable: true },
  { text: "Condition", value: "TrlId.condition.condition",  sortable: true  },
  { text: "Active", value: "trkActive", sortable: true  },
]


const registerForm = () => {
  router.push({ name: "register-trucks" })
}

const editTrucks = clickedRow => {
  console.log(clickedRow)
  router.push({ name: "truck-details", params: { id: clickedRow.id } })
}

const props = {
  header: "Trucks",
  subheader: "This is a list of trucks registered in the system.",
  button: {
    text: "Add Trucks",
    to: "/register-trucks",
  },
  tableHeader: {
    headers,
    items,
    searchField,
    searchValue,
  },
  clickedRow: editTrucks,
  loading: loading,
}
</script>
