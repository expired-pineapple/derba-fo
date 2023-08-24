<script setup>
import store from '@/store'

import { computed, onBeforeMount } from 'vue'
import { useStore } from 'vuex'

const infractionData =   {
  infractionType: "",
}

const infractionDataLocal = ref(structuredClone(infractionData))
const successAlert = ref(false)
const errorAlert = ref(false)

const resetForm = () => {
  infractionDataLocal.value = structuredClone(infractionData)
}

const submitForm = async() => {
  try{
    await store.dispatch("createInfractionType", infractionDataLocal.value)
    successAlert.value = true
    resetForm()
  } catch (err) {
    console.error('Error dispatching createInfraction action:', err)
    errorAlert.value = true
  }
}

const required = value => !!value || 'This Field is Required.'
</script>

<template>
  <div>
    <VRow>
      <VCol cols="12">
        <VAlert
          v-model="successAlert"
          border="start"
          variant="tonal"
          closable
          close-label="Close Alert"
          type="success"
          title="Success!"
          text="Infraction Type details saved successfully"
        />
        <VAlert
          v-model="errorAlert"
          border="start"
          variant="tonal"
          closable
          close-label="Close Alert"
          type="error"
          title="Error!"
          text="Infraction Type details hasn't been saved"
        />
        <VCard title="Infraction Type">
          <VDivider />
          <VCardText>
            <p>
              Fill the form below to register a new infraction type.
            </p>  
          </VCardText>
          <VCardText>
            <!-- 👉 Form -->
            <VForm class="mt-6">
              <VRow>
                <!-- 👉 Infraction Type -->
                <VCol
                  md="12"
                  cols="12"
                >
                  <VTextField
                    v-model="infractionDataLocal.infractionType"
                    label="Infraction Type"
                    :rules="[required]"
                  />
                </VCol>
                <!-- 👉 Form Actions -->
                <VCol
                  cols="12"
                  class="d-flex flex-wrap gap-4"
                >
                  <VBtn @click.prevent="submitForm">
                    Save
                  </VBtn>

                  <VBtn
                    color="secondary"
                    variant="tonal"
                    type="reset"
                    @click="resetForm"
                  >
                    Reset
                  </VBtn>
                </VCol>
              </VRow>
            </VForm>
          </VCardText>
        </VCard>
      </VCol>
    </VRow>
  </div>
</template>
