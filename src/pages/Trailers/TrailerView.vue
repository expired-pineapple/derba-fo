<template>
  <ListLayout v-bind="props" />
</template>

<script lang="ts" setup>
import ListLayout from "@/views/pages/page-layout/ListLayout.vue"
import router from "@/router"
import { ref, onMounted } from "vue"
import { mapActions, useStore } from 'vuex'


const headers = [
  { text: "Fleet Number", value: "fleet_number", sortable: true },
  { text: "Plate Number", value: "plate_number", sortable: true },
  { text: "Trailer Model", value: "trailer_model", sortable: true  },
  { text: "Trailer Type", value: "trailer_type", sortable: true },
  { text: "Capacity", value: "capacity",  sortable: true },
  { text: "Chasis Number", value: "chasis_number", sortable: true  },
  { text: "Remarks", value: "remarks", sortable: true  },
]



const store = useStore()

const items = ref([])

const loading = ref(true)

const edit = clickedRow => {
  console.log(clickedRow)
  router.push(`/trailer/${clickedRow.id}`)
}

onMounted(async () => {
  try {
    await store.dispatch("fetchTrailers")
    items.value = store.getters.trailers
  } catch (err) {
    console.error('Error dispatching fetchTrailers action:', err)
  } finally {
    loading.value = !loading.value
  }
})




const props = {
  header: "Trailers",
  subheader: "This is a list of Trailers registered in the system.",
  button: {
    text: "Add Trailers",
    to: "/register-trailers",
  },
  tableHeader: {
    headers,
    items,
  },
  loading,
  clickedRow: edit,
}
</script>
