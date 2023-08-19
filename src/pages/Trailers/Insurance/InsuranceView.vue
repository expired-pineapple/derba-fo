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
    await store.dispatch("fetchTrailerInsurances")
  } catch (err) {
    console.error('Error dispatching fetchTrailerInsurances action:', err)
  } finally {
    loading.value = false
  }
})


const items = ref(store.getters.trailerInsurances) 

console.log(items.value) 
    
const headers = [
  { text: "Plate Number", value: "TrlId.plate_number", sortable: true },
  { text: "Insurance Registration No", value: "trlInsRegistrationNo", sortable: true },
  { text: "Insurance Issue Date", value: "trlInsIssuanceDate", sortable: true },
  { text: "Validation Date", value: "trlInsValidationDate", sortable: true },
  { text: "Insurance Policy No", value: "trlInsPolicyNo", sortable: true },
  { text: "Active Status", value: "trlInscActive", sortable: true },
]



const edit = clickedRow => {
  console.log(clickedRow)
  router.push(`/trailer-insurance/${clickedRow.id}`)
}


const props = {
  header: "Trailer Insurance",
  subheader: "This is a list of Trailer Insurance registered in the system.",
  button: {
    text: "Add Trailer Insurance",
    to: "/register-trailer-insurance",
  },
  tableHeader: {
    headers,
    items,
  },
  loading: loading,
  clickedRow: edit,
}
</script>
