<script lang="ts" setup>
import router from '@/router'
import { ref, onBeforeMount } from 'vue'
import { useStore } from 'vuex'

const store = useStore()

const trailerData = {
  fleet_number: "",
  plate_number: "",
  trailer_type: "",
  capacity: "",
  is_active: "",
  chasis_number: "",
  condition: "",
  remarks: "",
  trailer_model: "",
  driver: "",
}

const trailerDataLocal = ref(structuredClone(trailerData))

const successAlert = ref(false)
const errorAlert = ref(false)

const resetForm = () => {
  trailerDataLocal.value = structuredClone(trailerData)
}

const drivers = ref([])
const conditions =ref([])

onBeforeMount(async () => {
  try {
    await store.dispatch("fetchDrivers")
    await store.dispatch("fetchConditions")
    conditions.value = store.getters.conditions
    drivers.value = store.getters.drivers
  } catch (err) {
    console.error("Error dispatching fetchDrivers action:", err)
  }
})

const error = store.getters.vehicleError

const submitForm = async() => {
  try {
    await store.dispatch("createTrailer", trailerDataLocal.value)
    if(!error) {
      successAlert.value = true
      resetForm()
      store.dispatch("fetchTrailers")
      setTimeout(() => {
        successAlert.value = false
      }, 5000)
    } else {
      errorAlert.value = true
    }
  } catch (err) {
    errorAlert.value = true
  }
}

const searchDriver = ref("")

const searchD = () => {
  drivers.value = searchDriver.value === ""
    ? store.getters.drivers
    : store.getters.drivers.filter(driver => {
      return driver.driver_name.toLowerCase().includes(searchDriver.value.toLowerCase())
    })
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
          text="Trailer details saved successfully"
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
          text="Trailer details not saved successfully"
          timeout="5000"
        />
        <VCard title="Trailer Details">
          <VDivider />
          <VCardText>
            <p>
              Fill the form below to register a new Trailer.
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
                    v-model="trailerDataLocal.fleet_number"
                    label="Fleet Number"
                    :rules="[isEmptyValidator]"
                    outlined
                    dense
                  />
                </VCol>
                <VCol
                  md="6"
                  cols="12"
                >
                  <VTextField
                    v-model="trailerDataLocal.plate_number"
                    label="Plate Number"
                    :rules="[isEmptyValidator]"
                    outlined
                    dense
                  />
                </VCol>
                <VCol
                  md="6"
                  cols="12"
                >
                  <VTextField
                    v-model="trailerDataLocal.trailer_model"
                    label="Trailer Model"
                    :rules="[isEmptyValidator]"
                    outlined
                    dense
                  />
                </VCol>
                <VCol
                  md="6"
                  cols="12"
                >
                  <VTextField
                    v-model="trailerDataLocal.trailer_type"
                    label="Trailer Type"
                    :rules="[isEmptyValidator]"
                    outlined
                    dense
                  />
                </VCol>
                <VCol
                  md="6"
                  cols="12"
                >
                  <VSelect
                    v-model="trailerDataLocal.driver"
                    :items="drivers"
                    item-title="driver_name"
                    item-value="id"
                    label="Driver"
                    :rules="[isEmptyValidator]"
                    outlined
                    dense
                  >
                    <template #prepend-item>
                      <VListItem>
                        <VListItemContent>
                          <VTextField
                            v-model="searchDriver"
                            placeholder="Search"
                            class="mx-4"
                            outlined
                            hide-details
                            single-line
                            clearable
                            prepend-inner-icon="mdi-magnify"
                            @input="searchD"
                          />
                        </VListItemContent>
                      </VListItem>
                      <VDivider />
                    </template>
                  </VSelect>
                </VCol>
                <VCol
                  md="6"
                  cols="12"
                >
                  <VTextField
                    v-model="trailerDataLocal.capacity"
                    label="Capacity"
                    :rules="[isEmptyValidator]"
                    outlined
                    dense
                  />
                </VCol>
                <VCol
                  md="6"
                  cols="12"
                >
                  <VTextField
                    v-model="trailerDataLocal.chasis_number"
                    label="Chasis Number"
                    :rules="[isEmptyValidator]"
                    outlined
                    dense
                  />
                </VCol>
                <VCol
                  md="6"
                  cols="12"
                >
                  <VSelect
                    v-model="trailerDataLocal.condition"
                    :items="conditions"
                    item-title="condition"
                    item-value="id"
                    label="Condition"
                    :rules="[isEmptyValidator]"
                    outlined
                    dense
                  />
                </VCol>
                <VCol
                  md="12"
                  cols="12"
                >
                  <VSelect
                    v-model="trailerDataLocal.is_active"
                    :items="[{text: 'Active', value: true}, {text: 'Inactive', value: false}]"
                    item-title="text"
                    item-value="value"
                    label="Is Active"
                    placeholder="Select a status"
                  />
                </VCol>
                <VCol
                  md="12"
                  cols="12"
                >
                  <VTextarea
                    v-model="trailerDataLocal.remarks"
                    label="Remarks"
                    outlined
                    dense
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
