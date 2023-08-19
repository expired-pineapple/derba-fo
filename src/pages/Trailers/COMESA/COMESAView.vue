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


const items = ref([]) 

onBeforeMount(async () => {
  try {
    await store.dispatch("fetchTrailerCOMESAs")
    items.value = store.getters.trailerCOMESAs
  } catch (err) {
    console.error('Error dispatching fetchFleet action:', err)
  } finally {
    loading.value = false
  }
})


console.log(items.value)

const headers = [
  { text: "Plate Number", value: "TrlId.plate_number", sortable: true },
  { text: "Comesa Number", value: "trlComesaNo", sortable: true },
  { text: "Comesa Yellow Number", value: "trlComesaYellowNo", sortable: true },
  { text: "Comesa Issuance Date", value: "trlComesaIssuanceDate", sortable: true },
  { text: "Comesa Expiry Date", value: "trlComesaValidDate", sortable: true },
  { text: "Comesa Country", value: "trlComesaCountry", sortable: true },
  { text: "Active Status", value: "trlComesaActive", sortable: true },
]



const edit = clickedRow => {
  console.log(clickedRow)
  router.push(`/trailer-comesa/${clickedRow.id}`)
}


const props = {
  header: "Trailer COMESA",
  subheader: "This is a list of Trailer COMESA registered in the system.",
  button: {
    text: "Add Trailer COMESA",
    to: "/register-trailer-comesa",
  },
  tableHeader: {
    headers,
    items,
  },
  loading: loading,
  clickedRow: edit,
}
</script>
