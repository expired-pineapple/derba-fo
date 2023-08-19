<template>
  <ListLayout v-bind="props" />
</template>

<script lang="ts" setup>
import ListLayout from "@/views/pages/page-layout/ListLayout.vue"
import router from "@/router"
import { ref, onBeforeMount } from "vue"
import { mapActions, useStore } from 'vuex'

const loading = ref(true)


const store = useStore()


onBeforeMount(async () => {
  try {
    await store.dispatch("fetchFleetBoloes")
    console.log('Fleet Boloes:', store.getters.fleetBoloes)
  } catch (err) {
    console.error('Error dispatching fetchFleet action:', err)
  } finally {
    loading.value = false
  }
})

const items = ref(store.getters.fleetBoloes) 

console.log(items.value)



    
const headers = [
  { text: "Fleet Number", value: "FltId.fltFleetNo", sortable: true },
  { text: "Bolo Number", value: "FltBolo_no", sortable: true },
  { text: "Bolo Issue Date", value: "FltBoloissuedate", sortable: true },
  { text: "Bolo Expiry Date", value: "FltBoloExpireDate", sortable: true },
  { text: "Active Status", value: "FltBoloActive", sortable: true },
]



const edit = clickedRow => {
  console.log(clickedRow)
  router.push(`/fleet-bolo/${clickedRow.id}`)
}


const props = {
  header: "Fleet Bolo",
  subheader: "This is a list of Fleet Bolo registered in the system.",
  button: {
    text: "Add Fleet Bolo",
    to: "/register-fleet-bolo",
  },
  tableHeader: {
    headers,
    items,
  },
  loading: loading,
  clickedRow: edit,
}
</script>
