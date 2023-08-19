<template>
  <ListLayout v-bind="props" />
</template>

<script lang="ts" setup>
import ListLayout from "@/views/pages/page-layout/ListLayout.vue"
import router from "@/router"
import { ref, onMounted, computed } from "vue"
import { mapActions, useStore } from 'vuex'

const searchField = ref("")
const searchValue = ref("")

const store = useStore()

const { fetchDriverLeaveLogs } = mapActions('driver', ['fetchDriverLeaveLogs'])

onMounted(async () => {
  try {
    await store.dispatch("fetchDriverLeaveLogs")
  } catch (err) {
    console.error('Error dispatching fetchDriverLeaveLogs action:', err)
  }
})

const items = computed(() => store.getters.driverLeaveLogs)

console.log(items.value)

const headers = [
  { text: "Full Name", value: "driverID.driver_name", sortable: true },
  { text: "Leave Type", value: "drvLeaveType", sortable: true },
  { text: "Address During Leave", value: "AddressDuringLeave", sortable: true },
  { text: "Leave Start Date", value: "drvLeaveStartDate" },
  { text: "Leave End Date", value: "drvLeaveEndDate" },
  { text: "Last Work Date", value: "LastworkDate",  sortable: true  },
  { text: "Leave Filled Date", value: "leavefilledDate", sortable: true },
]


const leaveForm = () => {
  router.push({ name: "driver-leave-form" })
}

const clickedRow = ref({})

const editDriverLeave = clickedRow => {
  console.log(clickedRow)
  router.push({ name: "driver-leave-edit", params: { id: clickedRow.id } })
}

const props = {
  header: "Driver Leave View",
  subheader: "This is a list of all leave logs in the system.",
  button: {
    text: "Add Driver Leave",
    to: '/driver-leave-form',
  },
  tableHeader: {
    headers,
    items,
  },
  clickedRow: editDriverLeave,
}
</script>
