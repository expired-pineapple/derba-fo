<template>
  <ListLayout v-bind="props" />
</template>

<script lang="ts" setup>
import router from "@/router"
import { ref, onMounted, computed } from "vue"
import { mapActions, useStore } from 'vuex'

import ListLayout from "@/views/pages/page-layout/ListLayout.vue"


const loading = ref(true)


const headers = [
  { text: "Driver Name", value: "driverID.driver_name", sortable: true },
  { text: "Djibouti Pass Number", value: "drvDjiboutiPassNo", sortable: true },
  { text: "Djibouti Pass Issue Date", value: "drvDjiboutiPIssuanceDate", sortable: true },
  { text: "Djibouti Pass Expiry Date", value: "drvDjiboutiPExpDate" },
  { text: "Active Status", value: "drvDjiboutiPActiveStatus" },

]

const { fetchDjiboutiPasses } = mapActions('driver', ['fetchDjiboutiPasses'])

const store = useStore()

onMounted(async () => {
  try {
    await store.dispatch("fetchDjiboutiPasses")
  } catch (err) {
    console.error('Error dispatching Fetch Driver Licences action:', err)
  }
  finally{
    loading.value = !loading.value  
  }
})

const items = computed(() => store.getters.djiboutiPasses)

console.log(items.value)

const clickedRow = ref({})

const edit = clickedRow => {
  console.log(clickedRow)
  router.push({ name: "driver-edit", params: { id: clickedRow.driverID.id } })
}

const props = {
  header: "Driver's Djibouti Pass List",
  subheader: "This is a list of all Driver's Djibouti Passes in the system.",
  button: {
    text: "Add Driver's Djibouti Pass",
    to: '/register-driver-djibouti-pass',
  },
  tableHeader: {
    headers,
    items,
  },
  clickedRow: edit,
}
</script>
