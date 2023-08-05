<template>
  <ListLayout v-bind="props" />
</template>

<script lang="ts" setup>
import { ref } from "vue"

import router from "@/router"
import ListLayout from "@/views/pages/page-layout/ListLayout.vue"

const searchField = ref("")
const searchValue = ref("")
  
const headers = [
  { text: "Driver DMC ID", value: "driver_dmc_id", sortable: true },
  { text: "Full Name", value: "driver_name", sortable: true },
  { text: "Job Title", value: "Job_title", sortable: true },
  { text: "Department", value: "department", sortable: true },
  { text: "Phone", value: "phone" },
  { text: "Permanent Residence", value: "permanent_residence" },
  { text: "Employment Status", value: "employment_status",  sortable: true  },
]

const items = [
  {
    "id": "1",
    "driver_name": "Abebe Kebede",
    "phone": "",
    "email": "abebe.kebede@example.com",
    "permanent_residence": "Addis Ababa, Ethiopia",
    "driver_dmc_id": "D1234",
    "department": "Logistics",
    "Job_title": "Delivery Driver",
    "is_active": true,
    "employment_status": "Full-time",
    "note_on_driver": null,
  },
  {
    "id": "2",
    "driver_name": "John Doe",
    "phone": "555-5678",
    "email": "john.doe@example.com",
    "permanent_residence": "Addis Ababa, Ethiopia",
    "driver_dmc_id": "D5678",
    "department": "Transportation",
    "Job_title": "Truck Driver",
    "is_active": true,
    "employment_status": "Full-time",
    "note_on_driver": null,
  },
  {
    "id": "3",
    "driver_name": "Chaltu Kebede",
    "phone": "555-4321",
    "email": "chaltu.kebede@example.com",
    "permanent_residence": "Addis Ababa, Ethiopia",
    "driver_dmc_id": "D9012",
    "department": "Logistics",
    "Job_title": "Delivery Driver",
    "is_active": false,
    "employment_status": "Part-time",
    "note_on_driver": null,
  },
  {
    "id": "4",
    "driver_name": "Yohannes Alemu",
    "phone": "555-8765",
    "email": "y_alemu@example.com",
    "permanent_residence": "Addis Ababa, Ethiopia",
    "driver_dmc_id": "D3456",
    "department": "Transportation",
    "Job_title": "Truck Driver",
    "is_active": true,
    "employment_status": "Full-time",
    "note_on_driver": "Requires additional training on hazardous materials",
  },

]

const clickedRow = ref({})

const editDriver = clickedRow => {
  console.log(clickedRow)
  router.push({ name: "driver-edit", params: { id: clickedRow.id } })
}

const props = {
  header: "Driver List",
  subheader: "This is a list of all drivers in the system.",
  button: {
    text: "Add Driver",
    to: '/register-drivers',
  },
  tableHeader: {
    headers,
    items,
    searchField,
    searchValue,
  },
  clickedRow: editDriver,
}
</script>

<style scoped>
.search {
  padding: 5px;
  border-block-end: 1px solid #0f8e3d;
  inline-size: 100%;
  margin-block-end: 10px;
}

.search-field {
  padding: 5px;
  border-block-end: none;
  font-size: 0.8rem;
  inline-size: 60%;
}

.search-field:focus {
  outline: none;
}
</style>
