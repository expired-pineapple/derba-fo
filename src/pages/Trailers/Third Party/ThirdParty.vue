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
    await store.dispatch("fetchTrailerThirdParties")
  } catch (err) {
    console.error('Error dispatching fetchTrailerThirdParties action:', err)
  } finally {
    loading.value = false
  }
}

onBeforeMount(fetchItems)

const items = computed(() => store.getters.trailerThirdParties)
    
const headers = [
  { text: "Plate Number", value: "TrlId.plate_number", sortable: true },
  { text: "Third Party Insurance No", value: "trlThirdInsNo", sortable: true },
  { text: "Third Party Issue Date", value: "trlThirdIssuanceDate", sortable: true },
  { text: "Validation Date", value: "trlThirdValidationDate", sortable: true },
  { text: "Third Party Policy No", value: "trlThirdPolicyNo", sortable: true },
  { text: "Active Status", value: "trlThirdActive", sortable: true },
]



const edit = clickedRow => {
  console.log(clickedRow)
  router.push(`/trailer-third-party/${clickedRow.id}`)
}


const props = {
  header: "Trailer Third Party",
  subheader: "This is a list of Trailer Third Party Insurances registered in the system.",
  button: {
    text: "Add Trailer Third Party",
    to: "/register-trailer-third-party",
  },
  tableHeader: {
    headers,
    items,
  },
  loading: loading,
  clickedRow: edit,
}
</script>
