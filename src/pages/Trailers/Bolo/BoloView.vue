<template>
  <ListLayout v-bind="props" />
</template>

<script lang="ts" setup>
import ListLayout from "@/views/pages/page-layout/ListLayout.vue"
import router from "@/router"
import { ref, onBeforeMount } from "vue"
import { mapActions, useStore } from 'vuex'

const loading = ref(true)

const { fetchFleets } = mapActions('vehicleModule', ['fetchFleets'])

const store = useStore()


onBeforeMount(async () => {
  try {
    await store.dispatch("fetchTrailerBoloes")
  } catch (err) {
    console.error('Error dispatching fetchTrailerBoloes action:', err)
  } finally {
    loading.value = false
  }
})

const items = ref(store.getters.trailerBoloes) 

    
const headers = [
  { text: "Plate Number", value: "TrlId.plate_number", sortable: true },
  { text: "Bolo Number", value: "trlBolo_no", sortable: true },
  { text: "Bolo Issue Date", value: "trlBoloissuedate", sortable: true },
  { text: "Bolo Expiry Date", value: "trlBoloExpireDate", sortable: true },
  { text: "Active Status", value: "trlBoloActive", sortable: true },
]



const edit = clickedRow => {
  router.push(`/trailer-bolo/${clickedRow.id}`)
}


const props = {
  header: "Trailer Bolo",
  subheader: "This is a list of Trailer Bolo registered in the system.",
  button: {
    text: "Add Trailer Bolo",
    to: "/register-trailer-bolo",
  },
  tableHeader: {
    headers,
    items,
  },
  loading: loading,
  clickedRow: edit,
}
</script>
