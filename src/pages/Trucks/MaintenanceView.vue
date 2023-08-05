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
  { text: "Maintenance Type", value: "maintenanceType", sortable: true, width: "150" },
  { text: "Vehicle", value: "vehicle", sortable: true },
  { text: "Odo Meter (KM)", value: "odoMeter", sortable: true },
  { text: "Service Provider", value: "serviceProvider", sortable: true  },
  { text: "Labor Price", value: "laborPrice", sortable: true },
  { text: "Material Price", value: "materialPrice",  sortable: true },
  { text: "Maintenance Date", value: "maintenanceDate", sortable: true  },
]



const items = [
  {
    "maintenanceType": "Routine Maintenance",
    "vehicle": "ET-101",
    "odoMeter": "150000 ",
    "serviceProvider": "Selam Garage",
    "laborPrice": "500",
    "materialPrice": "1500",
    "maintenanceDate": "2023-07-01",
  },
  {
    "maintenanceType": "Oil Change",
    "vehicle": "ET-102",
    "odoMeter": "170000 ",
    "serviceProvider": "Tilahun Auto Service",
    "laborPrice": "600",
    "materialPrice": "1000",
    "maintenanceDate": "2023-07-02",
  },
  {
    "maintenanceType": "Brake Service",
    "vehicle": "ET-103",
    "odoMeter": "180000 ",
    "serviceProvider": "Mulugeta Auto Repair",
    "laborPrice": "700",
    "materialPrice": "800",
    "maintenanceDate": "2023-07-03",
  },
  {
    "maintenanceType": "Tire Replacement",
    "vehicle": "ET-104",
    "odoMeter": "200000 ",
    "serviceProvider": "Fikru Tafa Auto Center",
    "laborPrice": "800",
    "materialPrice": "5000",
    "maintenanceDate": "2023-07-04",
  },
  {
    "maintenanceType": "Battery Replacement",
    "vehicle": "ET-105",
    "odoMeter": "220000 ",
    "serviceProvider": "Selam Garage",
    "laborPrice": "500",
    "materialPrice": "2500",
    "maintenanceDate": "2023-07-05",
  },
  {
    "maintenanceType": "Suspension Service",
    "vehicle": "ET-106",
    "odoMeter": "230000 ",
    "serviceProvider": "Tilahun Auto Service",
    "laborPrice": "600",
    "materialPrice": "3000",
    "maintenanceDate": "2023-07-06",
  },
  {
    "maintenanceType": "AC Service",
    "vehicle": "ET-107",
    "odoMeter": "250000 ",
    "serviceProvider": "Mulugeta Auto Repair",
    "laborPrice": "700",
    "materialPrice": "2000",
    "maintenanceDate": "2023-07-07",
  },
  {
    "maintenanceType": "Engine Tune-up",
    "vehicle": "ET-108",
    "odoMeter": "260000 ",
    "serviceProvider": "Fikru Tafa Auto Center",
    "laborPrice": "800",
    "materialPrice": "1500",
    "maintenanceDate": "2023-07-08",
  },
  {
    "maintenanceType": "Transmission Service",
    "vehicle": "ET-109",
    "odoMeter": "280000 ",
    "serviceProvider": "Selam Garage",
    "laborPrice": "500",
    "materialPrice": "3500",
    "maintenanceDate": "2023-07-09",
  },
  {
    "maintenanceType": "Electrical Service",
    "vehicle": "ET-110",
    "odoMeter": "300000 ",
    "serviceProvider": "Tilahun Auto Service",
    "laborPrice": "600",
    "materialPrice": "1000",
    "maintenanceDate": "2023-07-10",
  },
]

const registerForm = () => {
  router.push({ name: "register-trucks" })
}

const props = {
  header: "Maintenance",
  subheader: "This is a list of maintenance registered in the system.",
  button: {
    text: "Add Maintenance",
    to: "/register-maintenance",
  },
  tableHeader: {
    headers,
    items,
    searchField,
    searchValue,
  },
}
</script>
