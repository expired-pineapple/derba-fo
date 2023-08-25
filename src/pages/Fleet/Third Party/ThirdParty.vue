<template>
  <ListLayout v-bind="props" />
</template>

<script lang="ts" setup>
import ListLayout from "@/views/pages/page-layout/ListLayout.vue"
import router from "@/router"
import { ref, onBeforeMount, computed } from "vue"
import { mapActions, useStore } from 'vuex'

const loading = ref(true)

const store = useStore()

const fetchItems = async () => {
  try {
    await store.dispatch("fetchFleetThirdParties")
  } catch (err) {
    console.error('Error dispatching ThirdParties action:', err)
  } finally {
    loading.value = false
  }
}

onBeforeMount(fetchItems)

const items = computed(() => store.getters.fleetThirdParties)
    
const headers = [
  { text: "Plate Number", value: "FltId.fltFleetNo", sortable: true },
  { text: "Third Party Insurance No", value: "FltThirdInsNo", sortable: true },
  { text: "Third Party Issue Date", value: "FltThirdIssuanceDate", sortable: true },
  { text: "Validation Date", value: "FltThirdValidationDate", sortable: true },
  { text: "Third Party Policy No", value: "FltThirdPolicyNo", sortable: true },
  { text: "Active Status", value: "FltThirdActive", sortable: true },
]



const edit = clickedRow => {
  router.push(`/fleet-third-party/${clickedRow.id}`)
}


const props = {
  header: "Fleet Third Party",
  subheader: "This is a list of Fleet Third Party Insurances registered in the system.",
  button: {
    text: "Add Fleet Third Party",
    to: "/register-fleet-third-party",
  },
  tableHeader: {
    headers,
    items,
  },
  loading: loading,
  clickedRow: edit,
}
</script>
