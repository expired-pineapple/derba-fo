<template>
  <ListLayout v-bind="props" />
</template>

<script lang="ts" setup>
import ListLayout from "@/views/pages/page-layout/ListLayout.vue"
import router from "@/router"
import { ref, onMounted } from "vue"
import { useStore } from 'vuex'

const headers = [
  { value: "FoId.ShipmentCode", text: "Shipment Code", sortable: true },
  { value: "advParking", text: "Parking", sortable: true },
  { value: "advDjiboEnter", text: "Djb Entrance", sortable: true },
  { value: "advDate", text: "Date", sortable: true },
  { value: "advLoadUnload", text: "Load/Unload", sortable: true },
  { value: "advTyerRepair", text: "Tire Repair", sortable: true },
  { value: "advCarWash", text: "Car Wash", sortable: true },
  { value: "advFuelOnCash", text: "Fuel On Cash", sortable: true },
  { value: "advOther", text: "Other", sortable: true },
  { value: "advTotalAdv", text: "Total Advance", sortable: true },
]



const store = useStore()

const items = ref([])

const loading = ref(true)


onMounted(async () => {
  try {
    await store.dispatch("fetchAdvances")
    items.value = store.getters.advances
    console.log('items', items.value)
  } catch (err) {
    console.error('Error dispatching fetchTrailers action:', err)
  } finally {
    loading.value = !loading.value
  }
})




const props = {
  header: "Advance Payments",
  subheader: "This is a list of Advance Payments registered in the system.",
  button: {
    text: "Add Tire Status",
    to: "/tire-status/register",
  },
  buttonVisible: false,
  tableHeader: {
    headers,
    items,
  },
  loading,
}
</script>
