<template>
  <ListLayout v-bind="props" />
</template>

<script lang="ts" setup>
import { computed, ref } from "vue"

import router from "@/router"
import ListLayout from "@/views/pages/page-layout/ListLayout.vue"

const truckProps = defineProps({
  truck: Array,
})


const headers = [
  { text: "Fleet Number", value: "TrlId.fleet_number", sortable: true },
  { text: "Plate Number", value: "TrlId.plate_number", sortable: true },
  { text: "Trailer Model", value: "TrlId.trailer_model", sortable: true },
  { text: "Trailer Type", value: "TrlId.trailer_type", sortable: true },
  { text: "Active Status", value: "trkActive", sortable: true },
]

const items = ref(truckProps.truck)

console.log(items.value, "items")




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
