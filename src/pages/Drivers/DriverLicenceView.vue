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
  { text: "Licence Number", value: "drvLicenceNumber", sortable: true },
  { text: "Licence Authority", value: "drvLicenceAuthority", sortable: true },
  { text: "Licence Issue Date", value: "drvLicenceIssueDate", sortable: true },
  { text: "Licence Expiry Date", value: "drvLicenceExpiryDate" },
  { text: "Active Status", value: "drvLicenceActiveStatus" },

]

const { fetchEmergencyContacts } = mapActions('driver', ['fetchEmergencyContacts'])

const store = useStore()

onMounted(async () => {
  try {
    await store.dispatch("fetchDriverLicences")
  } catch (err) {
    console.error('Error dispatching Fetch Driver Licences action:', err)
  }
  finally{
    loading.value = !loading.value  
  }
})

const items = computed(() => store.getters.driverLicences)


const clickedRow = ref({})

const editDriversLicence = clickedRow => {
  router.push({ name: "driver-edit", params: { id: clickedRow.driverID.id } })
}

const props = {
  header: "Driver's Licence List",
  subheader: "This is a list of all Driver's Licences in the system.",
  button: {
    text: "Add Driver's Licence",
    to: '/register-drivers',
  },
  buttonVisible: false,
  tableHeader: {
    headers,
    items,
  },
  clickedRow: editDriversLicence,
}
</script>
