<script setup>
const truckData = {
  driver: "",
  plate_number: "",
  trailer_model: "",
  trailer_type: "",
  capacity: "",
  is_active: "",
  chasis_number: "",
  condition: "",
  remarks: "",
}

const drivers = [
  "John Doe",
  "Abebe Kebede",
  "Muluken Tadesse",
  "Tewodros Kibrom",
]

const truckDataLocal = ref(structuredClone(truckData))
const successAlert = ref(false)

const resetForm = () => {
  truckDataLocal.value = structuredClone(truckData)
}


const submitForm = () => {
  // Submit form data to backend
  console.log('Form submitted')
  successAlert.value = true
  resetForm()
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
          text="Truck details saved successfully"
        />
        <VCard title="Truck Details">
          <VDivider />
          <VCardText>
            <p>
              Fill the form below to register a new truck.
            </p>  
          </VCardText>
          <VCardText>
            <!-- 👉 Form -->
            <VForm class="mt-6">
              <VRow>
                <!-- 👉 Driver -->
                <VCol
                  md="6"
                  cols="12"
                >
                  <VSelect
                    v-model="truckDataLocal.driver"
                    :items="drivers"
                    label="Driver"
                    placeholder="Select a driver"
                  />
                </VCol>
  
                <!-- 👉 Plate Number -->
                <VCol
                  cols="12"
                  md="6"
                >
                  <VTextField
                    v-model="truckDataLocal.plate_number"
                    label="Plate Number"
                  />
                </VCol>
  
                <!-- 👉 Trailer Model -->
                <VCol
                  cols="12"
                  md="6"
                >
                  <VTextField
                    v-model="truckDataLocal.trailer_model"
                    label="Trailer Model"
                  />
                </VCol>
                <!-- 👉 Trailer Type -->
                <VCol
                  cols="12"
                  md="6"
                >
                  <VTextField
                    v-model="truckDataLocal.trailer_type"
                    label="Trailer Type"
                  />
                </VCol>
                <!-- 👉 Capacity -->
                <VCol
                  cols="12"
                  md="6"
                >
                  <VTextField
                    v-model="truckDataLocal.capacity"
                    label="Capacity"
                  />
                </VCol>
                <!-- 👉 Chasis Number -->
                <VCol
                  cols="12"
                  md="6"
                >
                  <VTextField
                    v-model="truckDataLocal.chasis_number"
                    label="Chasis Number"
                  />
                </VCol>
                <!-- 👉 Condition -->
                <VCol
                  cols="12"
                  md="6"
                >
                  <VTextField
                    v-model="truckDataLocal.condition"
                    label="Condition"
                  />
                </VCol>
                <!-- 👉 Remarks -->
                <VCol
                  cols="12"
                  md="12"
                >
                  <VTextarea
                    v-model="truckDataLocal.remarks"
                    label="Remarks"
                  />
                </VCol>
                <!-- 👉 Is Active -->
                <VCol
                  cols="12"
                  md="6"
                >
                  <VSwitch
                    v-model="truckDataLocal.is_active"
                    label="Is Active"
                  />
                </VCol>
                <!-- 👉 Form Actions -->
                <VCol
                  cols="12"
                  class="d-flex flex-wrap gap-4"
                >
                  <VBtn>Save</VBtn>

                  <VBtn
                    color="secondary"
                    variant="tonal"
                    type="reset"
                    @click.prevent="resetForm"
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


