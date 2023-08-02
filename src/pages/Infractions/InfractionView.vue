<template>
  <ListLayout v-bind="props" />
</template>

<script lang="ts" setup>
import ListLayout from "@/views/pages/page-layout/ListLayout.vue"
import router from "@/router"
import { ref } from "vue"

const searchField = ref("")
const searchValue = ref("")

const leaveForm = () => {
  router.push({ name: "register-infractions" })
}

const headers = [
  { text: "Infraction Type", value: "infractionType", sortable: true },
  { text: "Driver", value: "driverName", sortable: true },
  { text: "Infraction Date", value: "infractionDate" },
  { text: "Infraction Notes", value: "infractionNote" },
  { text: "Created At", value: "createdAt",  sortable: true  },
]

const items = [
  {
    "id": 1,
    "infractionType": "Speeding",
    "driverName": "Abebe Kebede",
    "infractionDate": "2023-07-01",
    "infractionNote": "Exceeded the speed limit on Bole Road",
    "createdAt": "2023-07-01",
  },
  {
    "id": 2,
    "infractionType": "Traffic Light Violation",
    "driverName": "Mulugeta Tadesse",
    "infractionDate": "2023-07-02",
    "infractionNote": "Ran a red light on Meskel Square",
    "createdAt": "2023-07-02",
  },
  {
    "id": 3,
    "infractionType": "Driving Without License",
    "driverName": "Eyerusalem Mengistu",
    "infractionDate": "2023-07-03",
    "infractionNote": "Caught driving without a valid license on Churchill Road",
    "createdAt": "2023-07-03",
  },
  {
    "id": 4,
    "infractionType": "Reckless Driving",
    "driverName": "Yohannes Kidane",
    "infractionDate": "2023-07-04",
    "infractionNote": "Weaving through traffic on Debrezeit Road",
    "createdAt": "2023-07-04",
  },
  {
    "id": 5,
    "infractionType": "Drunk Driving",
    "driverName": "Tigist Woldeselassie",
    "infractionDate": "2023-07-05",
    "infractionNote": "Found to be driving under the influence on Africa Avenue",
    "createdAt": "2023-07-05",
  },
  {
    "id": 6,
    "infractionType": "Seat Belt Violation",
    "driverName": "Biruk Hailemariam",
    "infractionDate": "2023-07-06",
    "infractionNote": "Was not wearing a seat belt while driving on Bole Road",
    "createdAt": "2023-07-06",
  },
  {
    "id": 7,
    "infractionType": "Driving Without Insurance",
    "driverName": "Robel Teshome",
    "infractionDate": "2023-07-07",
    "infractionNote": "Caught driving without valid insurance on Churchill Road",
    "createdAt": "2023-07-07",
  },
  {
    "id": 8,
    "infractionType": "Overloaded Vehicle",
    "driverName": "Fitsum Girma",
    "infractionDate": "2023-07-08",
    "infractionNote": "Carrying too much cargo on Debrezeit Road",
    "createdAt": "2023-07-08",
  },
  {
    "id": 9,
    "infractionType": "Wrong Way Driving",
    "driverName": "Yonas Assefa",
    "infractionDate": "2023-07-09",
    "infractionNote": "Driving against traffic on Meskel Square",
    "createdAt": "2023-07-09",
  },
  {
    "id": 10,
    "infractionType": "Expired License",
    "driverName": "Dawit Yohannes",
    "infractionDate": "2023-07-10",
    "infractionNote": "Caught driving with an expired license on Africa Avenue",
    "createdAt": "2023-07-10",
  },
]

const props = {
  header: "Infraction View",
  subheader: "This is a list of infractions registered in the system.",
  button: {
    text: "Add Infractions",
    onClick: leaveForm,
  },
  tableHeader: {
    headers,
    items,
    searchField,
    searchValue,
  },
}
</script>
