<script lang="ts" setup>
import { ref } from "vue"

const licence = {
  "drvLicenceNumber": "123456789",
  "drvLicenceAuthority": "Ethiopian Transport Authority",
  "drvLicenceIssueDate": "2023-12-11",
  "drvLicenceExpiryDate": "2025-12-11",
  "drvLicenceActiveStatus": true,
}

const licence_local = ref(JSON.parse(JSON.stringify(licence)))

const editLicence = ref(false)

const submitForm = () => {
  console.log(licence_local.value)
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
      @click="editLicence = !editLicence"
    />
  </div>
  <VCardText>
    <VForm :disabled="!editLicence">
      <VRow>
        <VCol
          md="6"
          cols="12"
        >
          <VTextField
            v-model="licence_local.drvLicenceNumber"
            label="Licence Number"
          />
        </VCol>
        <VCol
          md="6"
          cols="12"
        >
          <VTextField
            v-model="licence_local.drvLicenceAuthority"
            label="Licence Authority"
          />
        </VCol>
        <VCol
          md="6"
          cols="12"
        >
          <VTextField
            v-model="licence_local.drvLicenceIssueDate"
            label="Licence Issue Date"
            type="date"
          />
        </VCol>
        <VCol
          md="6"
          cols="12"
        >
          <VTextField
            v-model="licence_local.drvLicenceExpiryDate"
            label="Licence Expiry Date"
            type="date"
          />
        </VCol>
        <VCol
          md="6"
          cols="12"
        >
          <VSwitch
            v-model="licence_local.drvLicenceActiveStatus"
            label="Passport Active Status"
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
