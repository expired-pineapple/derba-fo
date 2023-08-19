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
    await store.dispatch("fetchFleetCOMESAs")
    items.value = store.getters.fleetCOMESAs
  } catch (err) {
    console.error('Error dispatching fetchFleet action:', err)
  } finally {
    loading.value = false
  }
})


console.log(items.value)


const headers = [
  { text: "Fleet Number", value: "FltId.fltFleetNo", sortable: true },
  { text: "Comesa Number", value: "FltComesaNo", sortable: true },
  { text: "Comesa Yellow Number", value: "FltComesaYellowNo", sortable: true },
  { text: "Comesa Issuance Date", value: "FltComesaIssuanceDate", sortable: true },
  { text: "Comesa Expiry Date", value: "FltComesaExpireDate", sortable: true },
  { text: "Comesa Country", value: "FltComesaCountry", sortable: true },
  { text: "Active Status", value: "FltComesaActive", sortable: true },

]



const edit = clickedRow => {
  console.log(clickedRow)
  router.push(`/fleet-comesa/${clickedRow.id}`)
}


const props = {
  header: "Fleet COMESA",
  subheader: "This is a list of Fleet COMESA registered in the system.",
  button: {
    text: "Add Fleet COMESA",
    to: "/register-fleet-comesa",
  },
  tableHeader: {
    headers,
    items,
  },
  loading: loading,
  clickedRow: edit,
}
</script>
