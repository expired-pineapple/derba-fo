<template>
  <VBtn color="primary mb-3">
    <VIcon>mdi-plus</VIcon>

    <span
      class="d-none d-sm-block"
      @click="addDriver"
    >Add new driver</span>
  </VBtn>
  <VCard>
    <VCardTitle>Driver List</VCardTitle>
    <VCardText>
      <p>
        This is a list of all drivers in the system.  You can search for a driver by name, or filter by DMC ID.
      </p>
    </VCardText>
    <div
      class="d-flex"
      style="margin: 0 10px 5px;"
    >
      <VSelect

        v-model="searchField"
        label="Search Field:"
        :items="['driver_name', 'driver_dmc_id', 'Job_title']"
      />
      <VTextField
        v-model="searchValue"
        label="Search Value:"
        style="width: 0.5px; margin-left: 10px;"
      />
    </div>

    <EasyDataTable
      :headers="headers"
      :items="items"
      :search-field="searchField"
      :search-value="searchValue"
      @click-row="editDriver"
    >
      <template #empty-message>
        <div class="text-center">
          <p>No drivers found.</p>
        </div>
      </template>
    </EasyDataTable>
  </VCard>
</template>

<script lang="ts" setup>
import router from "@/router";
import { ref } from "vue";
import { ClickRowArgument } from "vue3-easy-data-table";

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

const addDriver = () => {
  router.push('/register-drivers')
}
const clickedRow = ref({})

const editDriver = (item: ClickRowArgument) => {
  console.log(item)
  clickedRow.value = item
  router.push({ name: "driver-edit", params: { id: item.id } })
}
</script>
