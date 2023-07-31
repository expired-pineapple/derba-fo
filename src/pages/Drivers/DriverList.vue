<template>
  <VCard>
    <VCardTitle>Driver List</VCardTitle>
    <p class="text-caption mx-4">
      This is a list of all drivers in the system.  You can search for a driver by name, or filter by DMC ID.
    </p>
    <div class="d-flex">
      <VBtn
        variant="outlined"
        color="primary"
        height="30"
        class="ml-4 mt-3 mb-2"
      >
        <VIcon>mdi-plus</VIcon>
  
        <span
          class="d-none d-sm-block"
          @click="addDriver"
        >Add new driver</span>
      </VBtn>
      <div
        class="d-flex"
        style="margin: 0 10px 5px 30rem;"
      >
        <div class="search mr-4">
          <VIcon
            size="23"
            color="primary"
            class="mt-1"
          >
            mdi-magnify
          </VIcon>
          <input
            v-model="searchValue"
            class="search-field"
            type="text"
            placeholder="Search"
          >
        </div>
        <VMenu
          transition="slide-x-transition"
          class="mr-4"
        >
          <template #activator="{ props }">
            <VBtn
              icon="mdi-filter"
              v-bind="props"
              color="primary"
              variant="outlined"
              size="4"
              class="mt-3 mr-3"
            />
          </template>

          <VList width="100">
            <VListItem
              v-for="(item, i) in headers"
              :key="i"
              v-model="searchField"
              :value="item.value"
              @click="searchField = item.value"
            >
              <VListItemTitle class="text-center text-caption">
                {{ item.text }}
              </VListItemTitle>
            </VListItem>
          </VList>
        </VMenu>
      </div>
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
import router from "@/router"
import { ref } from "vue"
import { ClickRowArgument } from "vue3-easy-data-table"

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

const editDriver = clickedRow => {
  console.log(clickedRow)
  router.push({ name: "driver-edit", params: { id: clickedRow.id } })
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
