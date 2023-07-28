<template>
  <VBtn
    color="primary mb-3"
    @click="leaveForm"
  >
    <VIcon>mdi-plus</VIcon>

    <span class="d-none d-sm-block">Leave Form</span>
  </VBtn>
  <VCard>
    <VCardTitle>Leave Log</VCardTitle>
    <VCardText>
      <p>
        This is a list of all leave logs in the system.  You can search for a driver by name, or filter by DMC ID.
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
    >
      <template #empty-message>
        <div class="text-center">
          <p>No Logs Found.</p>
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
  { text: "Full Name", value: "driver_name", sortable: true },
  { text: "Leave Type", value: "drvLeaveType", sortable: true },
  { text: "Address During Leave", value: "AddressDuringLeave", sortable: true },
  { text: "Leave Start Date", value: "drvLeaveStartDate" },
  { text: "Leave End Date", value: "drvLeaveEndDate" },
  { text: "Last Work Date", value: "LastworkDate",  sortable: true  },
  { text: "Leave Filled Date", value: "is_leavefilledDateactive", sortable: true },
]

const items = []

const leaveForm = () => {
  router.push({ name: "driver-leave-form" })
}
</script>
