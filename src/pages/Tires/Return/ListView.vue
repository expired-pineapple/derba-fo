<template>
  <ListLayout v-bind="props" />
</template>

<script lang="ts" setup>
import ListLayout from "@/views/pages/page-layout/ListLayout.vue"
import router from "@/router"
import { ref, onMounted } from "vue"
import { useStore } from 'vuex'


const headers = [
  { text: "Tire", value: "NewTyerID.NewTyerSerialNo", sortable: true },
  { text: "Truck", value: "TrkId.FltId.flt", sortable: true },
  { text: "Issue No", value: "ReturningIssuNo", sortable: true },
  { text: "Date", value: "RtrnTyerClosingDate", sortable: true  },
  { text: "KM", value: "RtrnTyerClosingKM", sortable: true },
  { text: "Remark", value: "TyerClosingRemark", sortable: true  },
  { text: "Active", value: "RtrnTyerActive", sortable: true  },
]



const store = useStore()

const items = ref([])

const loading = ref(true)

const edit = clickedRow => {
  console.log(clickedRow)
  router.push(`/tire-return/${clickedRow.id}`)
}

onMounted(async () => {
  try {
    await store.dispatch("fetchTireReturns")
    items.value = store.getters.tireReturns
  } catch (err) {
    console.error('Error dispatching fetchTireReturns action:', err)
  } finally {
    loading.value = !loading.value
  }
})




const props = {
  header: "Tire Returns",
  subheader: "This is a list of Tire Returns registered in the system.",
  button: {
    text: "Add Tire Returns",
    to: "/tire-return/register",
  },
  tableHeader: {
    headers,
    items,
  },
  loading,
  clickedRow: edit,
}
</script>
