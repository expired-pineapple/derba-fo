<script setup>
import { useStore } from 'vuex'

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
const errorAlert = ref(false)


const resetForm = () => {
  BaTripDataLocal.value = structuredClone(BaTripData)
}

const store = useStore()

const submitForm = () => {
  store.dispatch("createRoute", BaTripDataLocal.value)

  console.log("Submitting form data:", BaTripDataLocal.value)

  const error = computed(() => store.getters.foError)
  if (error.value) {
    console.error('Error dispatching createRoute action:', error.value)
    errorAlert.value = true
    setTimeout(() => {
      errorAlert.value = false
    }, 5000)
  } else {
    successAlert.value = true
    setTimeout(() => {
      successAlert.value = false
    }, 5000)
    resetForm()

    store.dispatch("fetchRoutes")
  }
  
}
</script>

<template>
  <div>
    <VRow>
      <VCol>
        <VAlert
          border="start"
          variant="tonal"
          closable
          close-label="Close Alert"
          type="success"
          title="Success!"
        >
          Route created successfully.
        </VAlert>
        <VAlert
          v-model="errorAlert"
          border="start"
          variant="tonal"
          closable
          type="error"
          close-label="Close Alert"
        >
          Error creating route.
          <VCardText>
            <ul>
              <li
                v-for="err in error"
                :key="err"
              >
                {{ err }}
              </li>
            </ul>
          </VCardText>
        </VAlert>
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
                    v-model="BaTripDataLocal.trpOrigin"
                    label="Origin"
                  />
                </VCol>

                <!-- 👉 Destination -->
                <VCol
                  md="6"
                  cols="12"
                >
                  <VTextField
                    v-model="BaTripDataLocal.trpDestination"
                    label="Destination"
                  />
                </VCol>

                <!-- 👉 Distance -->
                <VCol
                  md="6"
                  cols="12"
                >
                  <VTextField
                    v-model="BaTripDataLocal.trpDistanceKm"
                    label="Distance (Km)"
                  />
                </VCol>

                <!-- 👉 Route Name -->
                <VCol
                  md="6"
                  cols="12"
                >
                  <VTextField
                    v-model="BaTripDataLocal.trpRouteName"
                    label="Route Name"
                  />
                </VCol>

                <!-- 👉 Turnaround Time -->
                <VCol
                  md="6"
                  cols="12"
                >
                  <VTextField
                    v-model="BaTripDataLocal.trpTurnaroundTime"
                    label="Turnaround Time"
                  />
                </VCol>

                <!-- 👉 Average Fuel -->
                <VCol
                  md="6"
                  cols="12"
                >
                  <VTextField
                    v-model="BaTripDataLocal.trpAvrgFuel"
                    label="Average Fuel"
                  />
                </VCol>

                <!-- 👉 Days -->
                <VCol
                  md="6"
                  cols="12"
                >
                  <VTextField
                    v-model="BaTripDataLocal.trpDays"
                    label="Days"
                  />
                </VCol>

                <!-- 👉 Left Fuel -->
                <VCol
                  md="6"
                  cols="12"
                >
                  <VTextField
                    v-model="BaTripDataLocal.trpLBltr"
                    label="Left Fuel (Ltr)"
                  />
                </VCol>

                <!-- 👉 Right Fuel -->
                <VCol
                  md="6"
                  cols="12"
                >
                  <VTextField
                    v-model="BaTripDataLocal.trpRltr"
                    label="Right Fuel (Ltr)"
                  />
                </VCol>
                <!-- 👉 Spare Fuel -->
                <VCol
                  md="6"
                  cols="12"
                >
                  <VTextField
                    v-model="BaTripDataLocal.trpSltr"
                    label="Spare Fuel (Ltr)"
                  />
                </VCol>
                <!-- 👉 Total Fuel -->
                <VCol
                  md="6"
                  cols="12"
                >
                  <VTextField
                    v-model="BaTripDataLocal.trpTltr"
                    label="Total Fuel (Ltr)"
                  />
                </VCol>
                <!-- 👉 Used Fuel -->
                <VCol
                  md="6"
                  cols="12"
                >
                  <VTextField
                    v-model="BaTripDataLocal.trpUltr"
                    label="Used Fuel (Ltr)"
                  />
                </VCol>

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
