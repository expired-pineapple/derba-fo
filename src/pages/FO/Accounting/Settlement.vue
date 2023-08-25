<template>
  <ListLayout v-bind="props" />
</template>

<script lang="ts" setup>
import ListLayout from "@/views/pages/page-layout/ListLayout.vue"
import router from "@/router"
import { ref, onMounted } from "vue"
import { useStore } from 'vuex'


const headers = [
  { text: "Shipment Code", value: "FOId.ShipmentCode", sortable: true },
  { text: "Dj. Entrance", value: "stlmDjiboEnter", sortable: true },
  { text: "Dj. Parking", value: "stlmDjiboParking", sortable: true },
  { text: "Load/Unload", value: "stlmLoadUnload", sortable: true },
  { text: "Local Parking", value: "stlmLocalParking", sortable: true },
  { text: "Tyer Repair", value: "stlmTyerRepair", sortable: true },
  { text: "Car Wash", value: "stlmCarWash", sortable: true },
  { text: "Fuel on Cash", value: "stlmFuelOnCash", sortable: true },
  { text: "Inner Tube", value: "stlmInnerTube", sortable: true },
  { text: "Other", value: "stlmOther", sortable: true },
]



const store = useStore()

const items = ref([])

const loading = ref(true)


onMounted(async () => {
  try {
    await store.dispatch("fetchSettlements")
    items.value = store.getters.settlements
  } catch (err) {
    console.error('Error dispatching fetchTrailers action:', err)
  } finally {
    loading.value = !loading.value
  }
})




const props = {
  header: "Settlements",
  subheader: "This is a list of Settlements registered in the system.",
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
