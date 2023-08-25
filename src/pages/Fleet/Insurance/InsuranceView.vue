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
    await store.dispatch("fetchFleetInsurances")
  } catch (err) {
    console.error('Error dispatching fetchFleetInsurances action:', err)
  } finally {
    loading.value = false
  }
})


const items = ref(store.getters.fleetInsurances) 
    
const headers = [
  { text: "Plate Number", value: "FltId.fltPlateNo", sortable: true },
  { text: "Insurance Registration No", value: "FltInsRegistrationNo", sortable: true },
  { text: "Insurance Issue Date", value: "FltInsIssuanceDate", sortable: true },
  { text: "Validation Date", value: "FltInsValidationDate", sortable: true },
  { text: "Insurance Policy No", value: "FltInsPolicyNo", sortable: true },
  { text: "Active Status", value: "FltInscActive", sortable: true },
]



const edit = clickedRow => {
  router.push(`/fleet-insurance/${clickedRow.id}`)
}


const props = {
  header: "Fleet Insurance",
  subheader: "This is a list of Fleet Insurance registered in the system.",
  button: {
    text: "Add Fleet Insurance",
    to: "/register-fleet-insurance",
  },
  tableHeader: {
    headers,
    items,
  },
  loading: loading,
  clickedRow: edit,
}
</script>
