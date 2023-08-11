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
  {
    text: "Origin",
    value: "trpOrigin",
  },
  {
    text: "Destination",
    value: "trpDestination",
  },
  {
    text: "Distance",
    value: "trpDistanceKm",
  },
  {
    text: "Route Name",
    value: "trpRouteName",
  },
  {
    text: "Turnaround Time",
    value: "trpTurnaroundTime",
  },
  {
    text: "Average Fuel",
    value: "trpAvrgFuel",
  },
  {
    text: "Days",
    value: "trpDays",
  },
  {
    text: "Ltr",
    value: "trpLBltr",
  },
  {
    text: "Rltr",
    value: "trpRltr",
  },
  {
    text: "Sltr",
    value: "trpSltr",
  },
  {
    text: "Tltr",
    value: "trpTltr",
  },
  {
    text: "Ultr",
    value: "trpUltr",
  },
]

const items = []

const props = {
  header: "Routes",
  subheader: "This is a list of routes registered in the system.",
  button: {
    text: "Add Routes",
    to: "/trip-form",
  },
  tableHeader: {
    headers,
    items,
    searchField,
    searchValue,
  },
}
</script>
