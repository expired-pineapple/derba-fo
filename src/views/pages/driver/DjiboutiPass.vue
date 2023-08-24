<script lang="ts" setup>
import { ref } from "vue"

const djiboutPass = {
  drvDjiboutiPassNo: "123456789",
  drvDjiboutiPIssuanceDate: "2023-12-11",
  drvDjiboutiPExpDate: "2025-12-11",
  drvDjiboutiPActiveStatus: false,
}

const djiboutPassLocal = ref(structuredClone(djiboutPass))

const editdjiboutPass = ref(false)

const submitForm = () => {
  console.log(djiboutPassLocal.value)
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
      @click="editdjiboutPass = !editdjiboutPass"
    />
  </div>
  <VCardText>
    <VForm
      :disabled="!editdjiboutPass"
      @submit.prevent="submitForm"
    >
      <VRow>
        <VCol
          md="6"
          cols="12"
        >
          <VTextField
            v-model="djiboutPassLocal.drvDjiboutiPassNo "
            label="Djibouti Pass Number"
            placeholder="A12345"
            required
          />
        </VCol>
        <VCol
          md="6"
          cols="12"
        >
          <VTextField
            v-model="djiboutPassLocal.drvDjiboutiPIssuanceDate"
            label="Djibouti Pass Issue Date"
            placeholder=""
            type="date"
          />
        </VCol>
        <VCol
          md="6"
          cols="12"
        >
          <VTextField
            v-model="djiboutPassLocal.drvDjiboutiPExpDate"
            label="Djibouti Pass Expiry Date"
            type="date"
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

