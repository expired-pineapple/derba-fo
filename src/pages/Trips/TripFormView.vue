<script setup>
const BaTripData = {
  trpOrigin: '',
  trpDestination: '',
  trpDistanceKm: '',
  trpRouteName: '',
  trpTurnaroundTime: '',
  trpAvrgFuel: '',
  trpDays: '',
  trpLBltr: '',
  trpRltr: '',
  trpSltr: '',
  trpTltr: '',
  trpUltr: '',
}


const BaTripDataLocal = ref(structuredClone(BaTripData))
const successAlert = ref(false)

const resetForm = () => {
  BaTripDataLocal.value = structuredClone(BaTripData)
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
      <VCol>
        <VCard>
          <VCardTitle>
            <h3 class="text-h5 mb-4">
              Trip Form
            </h3>
          </VCardTitle>
          <VDivider />
          <VCardText>
            <p>
              Fill the form below to register a new trip.
            </p>
          </VCardText>

          <VCardText>
            <VForm>
              <VRow>
                <!-- 👉 Origin -->
                <VCol
                  md="6"
                  cols="12"
                >
                  <VTextField
                    v-model="trpOrigin"
                    label="Origin"
                  />
                </VCol>

                <!-- 👉 Destination -->
                <VCol
                  md="6"
                  cols="12"
                >
                  <VTextField
                    v-model="trpDestination"
                    label="Destination"
                  />
                </VCol>

                <!-- 👉 Distance -->
                <VCol
                  md="6"
                  cols="12"
                >
                  <VTextField
                    v-model="trpDistanceKm"
                    label="Distance (Km)"
                  />
                </VCol>

                <!-- 👉 Route Name -->
                <VCol
                  md="6"
                  cols="12"
                >
                  <VTextField
                    v-model="trpRouteName"
                    label="Route Name"
                  />
                </VCol>

                <!-- 👉 Turnaround Time -->
                <VCol
                  md="6"
                  cols="12"
                >
                  <VTextField
                    v-model="trpTurnaroundTime"
                    label="Turnaround Time"
                  />
                </VCol>

                <!-- 👉 Average Fuel -->
                <VCol
                  md="6"
                  cols="12"
                >
                  <VTextField
                    v-model="trpAvrgFuel"
                    label="Average Fuel"
                  />
                </VCol>

                <!-- 👉 Days -->
                <VCol
                  md="6"
                  cols="12"
                >
                  <VTextField
                    v-model="trpDays"
                    label="Days"
                  />
                </VCol>

                <!-- 👉 Left Fuel -->
                <VCol
                  md="6"
                  cols="12"
                >
                  <VTextField
                    v-model="trpLBltr"
                    label="Left Fuel (Ltr)"
                  />
                </VCol>

                <!-- 👉 Right Fuel -->
                <VCol
                  md="6"
                  cols="12"
                >
                  <VTextField
                    v-model="trpRltr"
                    label="Right Fuel (Ltr)"
                  />
                </VCol>
                <!-- 👉 Spare Fuel -->
                <VCol
                  md="6"
                  cols="12"
                >
                  <VTextField
                    v-model="trpSltr"
                    label="Spare Fuel (Ltr)"
                  />
                </VCol>
                <!-- 👉 Total Fuel -->
                <VCol
                  md="6"
                  cols="12"
                >
                  <VTextField
                    v-model="trpTltr"
                    label="Total Fuel (Ltr)"
                  />
                </VCol>
                <!-- 👉 Used Fuel -->
                <VCol
                  md="6"
                  cols="12"
                >
                  <VTextField
                    v-model="trpUltr"
                    label="Used Fuel (Ltr)"
                  />
                </VCol>
                <VCol
                  cols="12"
                  class="d-flex flex-wrap gap-4"
                  @click.prevent="submitForm"
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
            </vform>
          </vcardtext>
        </vcard>
      </vcol>
    </vrow>
  </div>
</template>
