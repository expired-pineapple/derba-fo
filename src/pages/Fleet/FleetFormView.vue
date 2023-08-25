<script lang="ts" setup>
import router from '@/router'
import { ref } from 'vue'
import { useStore } from 'vuex'

const store = useStore()

const fleetData = {
  fltFleetNo: "",
  fltPlateNo: "",
  fltCapacity: "",
  fltMake: "",
  fltModel: "",
  fltActive: false,
  fltYear: "",
  fltTrkEngineNo: "",
  fltTrkChasNo: "",
  fltType: "",
  fltAxleNo: "",
  fltEngineType: "",
  fltEnginePower: "",
}

const fleetDataLocal = ref(structuredClone(fleetData))

const successAlert = ref(false)
const errorAlert = ref(false)

const resetForm = () => {
  fleetDataLocal.value = structuredClone(fleetData)
}

const submitForm = async () => {
  // Submit form data to backend
  console.log("Submitting form data:", fleetDataLocal.value)
  try {
    await store.dispatch("createFleet", fleetDataLocal.value)
    if(!store.getters.vehicleError  ) {
      successAlert.value = true
      resetForm()
      store.dispatch("fetchFleets")
      setTimeout(() => {
        successAlert.value = false
        router.push("/fleet")
      }, 5000)
    } else {
      errorAlert.value = true
    }
  } catch (err) {
    console.error("Error dispatching createFleet action:", err)
  }
}

const isEmptyValidator = value => {
  if (!value) {
    return "This field is required."
  }
  
  return true
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
          text="Fleet details saved successfully"
          timeout="5000"
        />
        <VAlert
          v-model="errorAlert"
          border="start"
          variant="tonal"
          closable
          close-label="Close Alert"
          type="error"
          title="Error!"
          text="Fleet details not saved successfully"
          timeout="5000"
        />
        <VCard title="Fleet Details">
          <VDivider />
          <VCardText>
            <p>
              Fill the form below to register a new Fleet.
            </p>  
          </VCardText>
          <VCardText>
            <!-- 👉 Form -->
            <VForm class="mt-6">
              <VRow>
                <VCol
                  md="6"
                  cols="12"
                >
                  <VTextField
                    v-model="fleetDataLocal.fltFleetNo"
                    label="Fleet Number"
                    required
                    outlined
                    dense
                    :rules="[isEmptyValidator]"
                  />
                </VCol>
                <VCol
                  md="6"
                  cols="12"
                >
                  <VTextField
                    v-model="fleetDataLocal.fltPlateNo"
                    label="Plate Number"
                    required
                    outlined
                    dense
                    :rules="[isEmptyValidator]"
                  />
                </VCol>
                <VCol
                  md="6"
                  cols="12"
                >
                  <VTextField
                    v-model="fleetDataLocal.fltCapacity"
                    label="Capacity(tons)"
                    required
                    outlined
                    dense
                    :rules="[isEmptyValidator]"
                  />
                </VCol>
                <VCol
                  md="6"
                  cols="12"
                >
                  <VTextField
                    v-model="fleetDataLocal.fltMake"
                    label="Make"
                    required
                    outlined
                    dense
                    :rules="[isEmptyValidator]"
                  />
                </VCol>
                <VCol
                  md="6"
                  cols="12"
                >
                  <VTextField
                    v-model="fleetDataLocal.fltModel"
                    label="Model"
                    required
                    outlined
                    dense
                    :rules="[isEmptyValidator]"
                  />
                </VCol>
                <VCol
                  md="6"
                  cols="12"
                >
                  <VTextField
                    v-model="fleetDataLocal.fltYear"
                    label="Year"
                    required
                    outlined
                    dense
                    :rules="[isEmptyValidator]"
                  />
                </VCol>
                <VCol
                  md="6"
                  cols="12"
                >
                  <VTextField
                    v-model="fleetDataLocal.fltTrkEngineNo"
                    label="Truck Engine Number"
                    required
                    outlined
                    dense
                    :rules="[isEmptyValidator]"
                  />
                </VCol>
                <VCol
                  md="6"
                  cols="12"
                >
                  <VTextField
                    v-model="fleetDataLocal.fltTrkChasNo"
                    label="Truck Chassis Number"
                    required
                    outlined
                    dense
                    :rules="[isEmptyValidator]"
                  />
                </VCol>
                <VCol
                  md="6"
                  cols="12"
                >
                  <VTextField
                    v-model="fleetDataLocal.fltType"
                    label="Type"
                    required
                    outlined
                    dense
                    :rules="[isEmptyValidator]"
                  />
                </VCol>
                <VCol
                  md="6"
                  cols="12"
                >
                  <VTextField
                    v-model="fleetDataLocal.fltAxleNo"
                    label="Axle Number"
                    required
                    outlined
                    dense
                    :rules="[isEmptyValidator]"
                  />
                </VCol>
                <VCol
                  md="6"
                  cols="12"
                >
                  <VTextField
                    v-model="fleetDataLocal.fltEngineType"
                    label="Engine Type"
                    required
                    outlined
                    dense
                    :rules="[isEmptyValidator]"
                  />
                </VCol>
                <VCol
                  md="6"
                  cols="12"
                >
                  <VTextField
                    v-model="fleetDataLocal.fltEnginePower"
                    label="Engine Power"
                    required
                    outlined
                    dense
                    :rules="[isEmptyValidator]"
                  />
                </VCol>
                <VCol
                  md="6"
                  cols="12"
                >
                  <VSelect
                    v-model="fleetDataLocal.fltActive"
                    label="Is Active"
                    :items="[
                      { text: 'Yes', value: true },
                      { text: 'No', value: false },
                    ]"
                    item-value="value"
                    item-title="text"
                    required
                    outlined
                    dense
                    :rules="[isEmptyValidator]"
                  />
                </VCol>
                <VCol
                  cols="12"
                  class="d-flex flex-wrap gap-4"
                >
                  <VBtn
                    color="primary"
                    @click="submitForm"
                  >
                    Save
                  </VBtn>
                  <VBtn
                    color="secondary"
                    variant="tonal"
                    type="reset"
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
