<template>
  <VBtn
    color="primary mb-3"
    @click="registerForm"
  >
    <VIcon>mdi-plus</VIcon>

    <span class="d-none d-sm-block">Register Trips</span>
  </VBtn>
  <VCard>
    <VCardTitle>Trip List</VCardTitle>
    <VCardText>
      <p>
        This is a list of all trips registered in the system.
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

<script setup>
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

const registerForm = () => {
  router.push({ name: "trip-form" })
}
</script>
