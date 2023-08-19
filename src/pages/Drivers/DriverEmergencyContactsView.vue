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
  { text: "Contact Name", value: "drvContactName", sortable: true },
  { text: "Contact Phone", value: "drvContactPhone", sortable: true },
  { text: "Contact Relationship", value: "drvContactRelatinship", sortable: true },
  { text: "Contact Adress", value: "drvContactAdress" },
  { text: "Active Status", value: "drvContactActiveStatus" },

]

const { fetchEmergencyContacts } = mapActions('driver', ['fetchEmergencyContacts'])

const store = useStore()

onMounted(async () => {
  try {
    await store.dispatch("fetchEmergencyContacts")
  } catch (err) {
    console.error('Error dispatching fetchEmergencyContacts action:', err)
  }
  finally{
    loading.value = !loading.value  
  }
})

const items = computed(() => store.getters.emergencyContacts)

const clickedRow = ref({})

const editEmergencyContact = clickedRow => {
  console.log(clickedRow)
  router.push({ name: "driver-edit", params: { id: clickedRow.driverID.id } })
}

const props = {
  header: "Emergency Contact List",
  subheader: "This is a list of all emergency contacts in the system.",
  button: {
    text: "Add Emergency Contact",
    to: '/register-drivers',
  },
  buttonVisible: false,
  tableHeader: {
    headers,
    items,
  },
  clickedRow: editEmergencyContact,
}
</script>
