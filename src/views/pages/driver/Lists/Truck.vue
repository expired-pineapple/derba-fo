<template>
  <ListLayout v-bind="props" />
</template>

<script lang="ts" setup>
import { ref } from "vue"

import router from "@/router"
import ListLayout from "@/views/pages/page-layout/ListLayout.vue"

const headers = [
  { text: "Fleet Number", value: "fleet_number", sortable: true },
  { text: "Plate Number", value: "plate_number", sortable: true },
  { text: "Trailer Model", value: "trailer_model", sortable: true },
  { text: "Trailer Type", value: "trailer_type", sortable: true },
  { text: "Active Status", value: "trkActive", sortable: true },
]

const items = [
  {
    "fleet_number": "ET-101",
    "fltPlateNo": "6-4578-19",
    "plate_number": "3-4567-89",
    "trailer_model": "Sinotruck",
    "trailer_type": "Flatbed",
    "trkActive": true,
  },
]

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
