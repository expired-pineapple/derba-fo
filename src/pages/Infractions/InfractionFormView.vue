<script setup>
const infractionData =   {
  "infractionType": "",
  "driverName": "",
  "infractionDate": "",
  "infractionNote": "",
}

const infractionDataLocal = ref(structuredClone(infractionData))
const successAlert = ref(false)

const resetForm = () => {
  infractionDataLocal.value = structuredClone(infractionData)
}

const submitForm = () => {
  successAlert.value = false // Set successAlert to false at the beginning
  // Submit form data to backend
  console.log('Form submitted')
  successAlert.value = true
}
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
          text="Driver details saved successfully"
        />
        <VCard title="Driver Details">
          <VDivider />
          <VCardText>
            <p>
              Fill the form below to register a new infraction.
            </p>  
          </VCardText>
          <VCardText>
            <!-- 👉 Form -->
            <VForm class="mt-6">
              <VRow>
                <!-- 👉 Infraction Type -->
                <VCol
                  md="6"
                  cols="12"
                >
                  <VSelect
                    v-model="infractionDataLocal.infractionType"
                    label="Infraction Type"
                  />
                </VCol>
  
                <!-- 👉 Driver -->
                <VCol
                  cols="12"
                  md="6"
                >
                  <VSelect
                    v-model="infractionDataLocal.driverName"
                    label="Driver Name"
                  />
                </VCol>
  
                <!-- 👉 Infraction Date -->
                <VCol
                  cols="12"
                  md="6"
                >
                  <VTextField
                    v-model="infractionDataLocal.infractionDate"
                    label="Infraction Date"
                    placeholder="2021-07-01"
                    type="date"
                  />
                </VCol>
                <VCol />
  
                <!-- 👉 Infraction Note -->
                <VCol
                  cols="12"
                  md="12"
                >
                  <VTextarea
                    v-model="infractionDataLocal.infractionNote"
                    label="Infraction Note"
                    placeholder="Exceeded the speed limit on Bole Road"
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
