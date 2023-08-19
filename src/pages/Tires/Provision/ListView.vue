<template>
  <ListLayout v-bind="props" />
</template>

<script lang="ts" setup>
import ListLayout from "@/views/pages/page-layout/ListLayout.vue"
import router from "@/router"
import { ref, onMounted } from "vue"
import { useStore } from 'vuex'

const headers = [
  { text: "Truck", value: "TrkId", sortable: true },
  { text: "Issue No", value: "NewTyerIssuNo", sortable: true },
  { text: "Date", value: "NewTyerDate", sortable: true  },
  { text: "KM", value: "NewTyerKM", sortable: true },
  { text: "Brand", value: "NewTyerBrand",  sortable: true },
  { text: "Serial No", value: "NewTyerSerialNo", sortable: true  },
  { text: "Remark", value: "NewTyerRemark", sortable: true  },
  { text: "Active", value: "NewTyerActive", sortable: true  },
]



const store = useStore()

const items = ref([])

const loading = ref(true)

const edit = clickedRow => {
  console.log(clickedRow)
  router.push(`/tire-provision/${clickedRow.id}`)
}

onMounted(async () => {
  try {
    await store.dispatch("fetchTireProvisions")
    items.value = store.getters.tireProvisions
  } catch (err) {
    console.error('Error dispatching fetchTrailers action:', err)
  } finally {
    loading.value = !loading.value
  }
})




const props = {
  header: "Tire Provisions",
  subheader: "This is a list of Tire Provisions registered in the system.",
  button: {
    text: "Add Tire Provisions",
    to: "/tire-provisions/register",
  },
  tableHeader: {
    headers,
    items,
  },
  loading,
  clickedRow: edit,
}
</script>
