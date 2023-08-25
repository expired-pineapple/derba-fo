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
  { text: "Passport Number", value: "drvPassportNo", sortable: true },
  { text: "Passport Issue Date", value: "drvPassportIssuanceDate", sortable: true },
  { text: "Passport Expiry Date", value: "drvPassportExpireDate" },
  { text: "Active Status", value: "drvPassportActiveStatus" },

]

const { fetchDriverPassports } = mapActions('driver', ['fetchDriverPassports'])

const store = useStore()

onMounted(async () => {
  try {
    await store.dispatch("fetchDriverPassports")
  } catch (err) {
    console.error('Error dispatching Fetch Driver Licences action:', err)
  }
  finally{
    loading.value = !loading.value  
  }
})

const items = computed(() => store.getters.driverPassports)

const clickedRow = ref({})

const edit = clickedRow => {
  router.push({ name: "driver-edit", params: { id: clickedRow.driverID.id } })
}

const props = {
  header: "Driver's Passport List",
  subheader: "This is a list of all Driver's Passport in the system.",
  button: {
    text: "Add Driver's Passport",
    to: '/register-drivers',
  },
  buttonVisible: false,
  tableHeader: {
    headers,
    items,
  },
  clickedRow: edit,
}
</script>
