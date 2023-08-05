<template>
  <ListLayout v-bind="props" />
</template>

<script lang="ts" setup>
import ListLayout from "@/views/pages/page-layout/ListLayout.vue"
import router from "@/router"
import { ref } from "vue"
import { list } from "postcss"

const searchField = ref("")
const searchValue = ref("")
  
const headers = [
  { text: "Driver", value: "driver", sortable: true, width: "150" },
  { text: "Fleet Number", value: "fleet_number", sortable: true },
  { text: "Plate Number", value: "plate_number", sortable: true },
  { text: "Trailer Model", value: "trailer_model", sortable: true  },
  { text: "Trailer Type", value: "trailer_type", sortable: true },
  { text: "Capacity", value: "capacity",  sortable: true },
  { text: "Chasis Number", value: "chasis_number", sortable: true  },
  { text: "Condition", value: "condition",  sortable: true  },
  { text: "Remarks", value: "remarks", sortable: true  },
]

const items = [
  {
    "driver": "Mulugeta Bekele",
    "fleet_number": "ET-101",
    "plate_number": "3-4567-89",
    "trailer_model": "Sinotruck",
    "trailer_type": "Flatbed",
    "capacity": "30 tons",
    "chasis_number": "XYZ123456",
    "condition": "Good",
    "remarks": "Scheduled for maintenance next week",
  },
  {
    "driver": "Abebech Tadesse",
    "fleet_number": "ET-102",
    "plate_number": "3-4568-90",
    "trailer_model": "Foton",
    "trailer_type": "Dry Van",
    "capacity": "20 tons",
    "chasis_number": "ABC456789",
    "condition": "Fair",
    "remarks": "Needs new tires",
  },
  {
    "driver": "Teshome Alemu",
    "fleet_number": "ET-103",
    "plate_number": "3-4569-91",
    "trailer_model": "TATA",
    "trailer_type": "Refrigerated",
    "capacity": "15 tons",
    "chasis_number": "PQR987654",
    "condition": "Good",
    "remarks": "",
  },
  {
    "driver": "Zenebech Tesfaye",
    "fleet_number": "ET-104",
    "plate_number": "3-4570-92",
    "trailer_model": "Isuzu",
    "trailer_type": "Flatbed",
    "capacity": "25 tons",
    "chasis_number": "DEF123456",
    "condition": "Fair",
    "remarks": "Scheduled for inspection next week",
  },
  {
    "driver": "Yonas Mitiku",
    "fleet_number": "ET-105",
    "plate_number": "3-4571-93",
    "trailer_model": "Hino",
    "trailer_type": "Dry Van",
    "capacity": "30 tons",
    "chasis_number": "GHI789012",
    "condition": "Good",
    "remarks": "",
  },
  {
    "driver": "Tigist Getachew",
    "fleet_number": "ET-106",
    "plate_number": "3-4572-94",
    "trailer_model": "Volvo",
    "trailer_type": "Refrigerated",
    "capacity": "20 tons",
    "chasis_number": "JKL234567",
    "condition": "Fair",
    "remarks": "Needs new brakes",
  },
  {
    "driver": "Biruk Alemayehu",
    "fleet_number": "ET-107",
    "plate_number": "3-4573-95",
    "trailer_model": "Mercedes-Benz",
    "trailer_type": "Flatbed",
    "capacity": "25 tons",
    "chasis_number": "MNO890123",
    "condition": "Good",
    "remarks": "",
  },
  {
    "driver": "Eyerusalem Assefa",
    "fleet_number": "ET-108",
    "plate_number": "3-4574-96",
    "trailer_model": "Scania",
    "trailer_type": "Dry Van",
    "capacity": "20 tons",
    "chasis_number": "PQR345678",
    "condition": "Fair",
    "remarks": "Scheduled for maintenance next month",
  },
  {
    "driver": "Fitsum Teshome",
    "fleet_number": "ET-109",
    "plate_number": "3-4575-97",
    "trailer_model": "DAF",
    "trailer_type": "Refrigerated",
    "capacity": "15 tons",
    "chasis_number": "STU901234",
    "condition": "Good",
    "remarks": "",
  },
  {
    "driver": "Dawit Yohannes",
    "fleet_number": "ET-110",
    "plate_number": "3-4576-98",
    "trailer_model": "MAN",
    "trailer_type": "Flatbed",
    "capacity": "30 tons",
    "chasis_number": "VWX567890",
    "condition": "Fair",
    "remarks": "Needs new suspension",
  },
]

const registerForm = () => {
  router.push({ name: "register-trucks" })
}

const props = {
  header: "Trucks",
  subheader: "This is a list of trucks registered in the system.",
  button: {
    text: "Add Trucks",
    to: "/register-trucks",
  },
  tableHeader: {
    headers,
    items,
    searchField,
    searchValue,
  },
}
</script>
