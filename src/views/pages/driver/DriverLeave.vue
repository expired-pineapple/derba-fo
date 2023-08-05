<script lang="ts" setup>
import { ref } from "vue"

const driverLeave = {
  drvLeaveStartDate: "2021-12-11",
  drvLeaveEndDate: "2021-12-11",
  drvLeaveReason: "Vacation",
  drvLeaveActiveStatus: true,
}

const driverLeaveLocal = ref(structuredClone(driverLeave))

const editdriverLeave = ref(false)

const submitForm = () => {
  console.log(driverLeaveLocal.value)
}
</script>

<template>
  <div
    class="d-flex gap-4"
    style="justify-content: flex-end;"
  >
    <VIcon
      class="cursor-pointer"
      color="primary"
      size="24"
      start
      icon="mdi-pencil-outline"
      @click="editdriverLeave = !editdriverLeave"
    />
  </div>
  <VCardText>
    <!-- 👉 Form -->
    <VForm
      class=""
      :disabled="!editdriverLeave"
    >
      <VRow>
        <VCol
          md="6"
          cols="12"
        >
          <VTextField
            v-model="driverLeaveLocal.drvLeaveStartDate"
            label="Leave Start Date"
            type="date"
          />
        </VCol>
        <VCol
          md="6"
          cols="12"
        >
          <VTextField
            v-model="driverLeaveLocal.drvLeaveEndDate"
            label="Leave End Date"
            type="date"
          />
        </VCol>
        <VCol
          md="6"
          cols="12"
        >
          <VTextField
            v-model="driverLeaveLocal.drvLeaveReason"
            label="Reason for Leave"
          />
        </VCol>
        <VCol
          md="6"
          cols="12"
        >
          <VSwitch
            v-model="driverLeaveLocal.drvLeaveActiveStatus"
            label="Leave Active Status"
          />
        </VCol>
        <!-- 👉 Form Actions -->
        <VCol 
          cols="12"
          class="d-flex flex-wrap gap-4"
        >
          <VBtn
            color="primary gap-4"
            @click="submitForm"
          >
            Save Changes
          </VBtn>
        </VCol>
      </VRow>
    </VForm>
  </VCardText>
</template>

