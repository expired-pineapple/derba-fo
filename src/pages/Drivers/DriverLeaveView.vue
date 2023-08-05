<template>
  <ListLayout v-bind="props" />
</template>

<script lang="ts" setup>
import ListLayout from "@/views/pages/page-layout/ListLayout.vue"
import router from "@/router"
import { ref } from "vue"

const searchField = ref("")
const searchValue = ref("")

const headers = [
  { text: "Full Name", value: "driver_name", sortable: true },
  { text: "Leave Type", value: "drvLeaveType", sortable: true },
  { text: "Address During Leave", value: "AddressDuringLeave", sortable: true },
  { text: "Leave Start Date", value: "drvLeaveStartDate" },
  { text: "Leave End Date", value: "drvLeaveEndDate" },
  { text: "Last Work Date", value: "LastworkDate",  sortable: true  },
  { text: "Leave Filled Date", value: "is_leavefilledDateactive", sortable: true },
]

const items = []

const props = {
  header: "Driver Leave View",
  subheader: "This is a list of all leave logs in the system.",
  button: {
    text: "Add Leave",
    to: "/driver-leave-form",
  },
  tableHeader: {
    headers,
    items,
    searchField,
    searchValue,
  },
}
</script>
