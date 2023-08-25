<script lang="ts" setup>
import { ref } from "vue"

const drvPassport = defineProps({
  drvPassport: {
    type: Array,
    required: true,
  },
})


const drvPassportLocal = ref(drvPassport.drvPassport)

const editPassport = ref(false)


const submitForm = () => {
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
      @click="editPassport = !editPassport"
    />
  </div>
  <VCardText>
    <VForm :disabled="!editPassport">
      <VRow
        v-for="drvpass in drvPassportLocal"
        :key="drvpass"
      >
        <VCol
          md="6"
          cols="12"
        >
          <VTextField
            v-model="drvpass.drvPassportNo"
            label="Passport Number"
            placeholder="A12345"
            :disabled="!editPassport"
          />
        </VCol>
        <VCol
          md="6"
          cols="12"
        >
          <VTextField
            v-model="drvpass.drvPassportIssuanceDate"
            label="Passport Issue Date"
            placeholder=""
            type="date"
          />
        </VCol>
        <VCol
          md="6"
          cols="12"
        >
          <VTextField
            v-model="drvpass.drvPassportExpireDate"
            label="Passport Expiry Date"
            type="date"
          />
        </VCol>
        <VCol
          md="6"
          cols="12"
        >
          <VSwitch
            v-model="drvpass.drvPassportActiveStatus"
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

