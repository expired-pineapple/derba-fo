<template>
  <VBtn
    color="primary mb-3"
    @click="registerForm"
  >
    <VIcon>mdi-plus</VIcon>

    <span class="d-none d-sm-block">Register Trucks</span>
  </VBtn>
  <VCard>
    <VCardTitle>Trucks List</VCardTitle>
    <VCardText>
      <p>
        This is a list of all trucks registered in the system.
      </p>
    </VCardText>
    <div
      class="d-flex"
      style="margin: 0 10px 5px;"
    >
      <VSelect

        v-model="searchField"
        label="Search Field:"
        :items="headers.map((h) => h.value)"
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
    >
      <template #empty-message>
        <div class="text-center">
          <p>No Data Available.</p>
        </div>
      </template>
    </EasyDataTable>
  </VCard>
</template>

<script lang="ts" setup>
import router from "@/router"
import { ref } from "vue"

const searchField = ref("")
const searchValue = ref("")
  
const headers = [
  { text: "Driver", value: "driver" },
  { text: "Fleet Number", value: "fleet_number", sortable: true },
  { text: "Plate Number", value: "plate_number", sortable: true },
  { text: "Trailer Model", value: "trailer_model" },
  { text: "Trailer Type", value: "trailer_type", sortable: true },
  { text: "Capacity", value: "capacity" },
  { text: "Chasis Number", value: "chasis_number" },
  { text: "Condition", value: "condition" },
  { text: "Remarks", value: "remarks" },
]

const items = []

const registerForm = () => {
  router.push({ name: "register-trucks" })
}
</script>
