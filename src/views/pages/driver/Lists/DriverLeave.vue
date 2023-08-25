<template>
  <ListLayout v-bind="props" />
</template>

<script lang="ts" setup>
import { ref } from "vue"

import router from "@/router"
import ListLayout from "@/views/pages/page-layout/ListLayout.vue"
  
const leaveProps = defineProps({
  driverLeave: Array,
})


const headers = [
  { text: "Leave Start Date", value: "drvLeaveStartDate", sortable: true },
  { text: "Leave End Date", value: "drvLeaveEndDate", sortable: true },
  { text: "Leave Reason", value: "drvLeaveReason", sortable: true },
  { text: "Active Status", value: "drvLeaveActiveStatus", sortable: true },
]


const items = ref(leaveProps.driverLeave)

const props = {
  buttonVisible: false,
 
  tableHeader: {
    headers,
    items,
  },
  rows: 5,
  clickedRow: {
    id: "",
    name: "",
  },
}
</script>
