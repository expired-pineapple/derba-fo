<template>
  <ListLayout v-bind="props" />
</template>

<script lang="ts" setup>
import ListLayout from "@/views/pages/page-layout/ListLayout.vue"
import router from "@/router"
import { ref, onMounted } from "vue"
import { useStore } from 'vuex'

const headers = [
  { text: "Category", value: "Category", sortable: true },
  { text: "Status Description", value: "NewTyerIssuNo", sortable: true },
]



const store = useStore()

const items = ref([])

const loading = ref(true)

const edit = clickedRow => {
  router.push(`/tire-status/${clickedRow.id}`)
}

onMounted(async () => {
  try {
    await store.dispatch("fetchTireStatus")
    items.value = store.getters.tireStatus
  } catch (err) {
  } finally {
    loading.value = !loading.value
  }
})




const props = {
  header: "Tire Provisions",
  subheader: "This is a list of Tire Status registered in the system.",
  button: {
    text: "Add Tire Status",
    to: "/tire-status/register",
  },
  tableHeader: {
    headers,
    items,
  },
  loading,
  clickedRow: edit,
}
</script>
