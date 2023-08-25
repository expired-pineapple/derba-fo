<script setup>
import router from "@/router"
import { ref, onBeforeMount, computed } from "vue"
import { useStore } from "vuex"


const truckData = {
  DrvId: "",
  FltId: "",
  TrlId: "",
  trkActive: false,
}

const store = useStore()

const truckDataLocal = ref(structuredClone(truckData))
const successAlert = ref(false)
const errorAlert = ref(false)

const trailer = ref([])
const fleet = ref([])
const drivers = ref([])
const driverLoading = ref(true)
const trailerLoading = ref(true)
const fleetLoading = ref(true)



onBeforeMount(async () => {
  try {
    await store.dispatch("fetchFleets")
    await store.dispatch("fetchDrivers")
    await store.dispatch("fetchTrailers")
    drivers.value = store.getters.drivers
    trailer.value = store.getters.trailers
    fleet.value = store.getters.fleets
  } catch (err) {
  } finally {
    driverLoading.value = false
    trailerLoading.value = false
    fleetLoading.value = false
  }

})

const resetForm = () => {
  truckDataLocal.value = structuredClone(truckData)
}

const submitForm = async() => {
  // Submit form data to backend
  try {
    await store.dispatch("createTruck", truckDataLocal.value)

    const error = computed(() => store.getters.vehicleError)

    if (error.value) {
      errorAlert.value = true
    }else{
      successAlert.value = true
      store.dispatch("fetchTrucks")
    }
    resetForm()
  } catch (err) {
    errorAlert.value = true
  }
}

const searchDriver = ref("")
const searchFleet = ref("")
const searchTrailer = ref("")

const search = (searchValue, data, searchKey, target) => {
  if (searchValue) {
    target.value = data.filter(item => {
      return item[searchKey].toLowerCase().includes(searchValue.toLowerCase())
    })
  } else {
    target.value = data
  }
}

const searchD = () => {
  search(searchDriver.value, store.getters.drivers, "driver_name", drivers)
}

const searchF = () => {
  search(searchFleet.value, store.getters.fleets, "fltFleetNo", fleet)
}

const searchT = () => {
  search(searchTrailer.value, store.getters.trailers, "plate_number", trailer)
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
          text="Truck details saved successfully"
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
          text="Truck details not saved successfully"
          timeout="5000"
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
                    v-model="truckDataLocal.DrvId"
                    :items="drivers"
                    item-title="driver_name"
                    item-value="id"
                    :loading="driverLoading"
                    label="Driver"
                    placeholder="Select a driver"
                    :rules="[isEmptyValidator]"
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
                <!-- 👉 Fleet -->
                <VCol
                  md="6"
                  cols="12"
                >
                  <VSelect
                    v-model="truckDataLocal.FltId"
                    :items="fleet"
                    item-title="fltFleetNo"
                    item-value="id"
                    :loading="driverLoading"
                    label="Fleet"
                    placeholder="Select a fleet"
                    :rules="[isEmptyValidator]"
                  >
                    <template #prepend-item>
                      <VListItem>
                        <VListItemContent>
                          <VTextField
                            v-model="searchFleet"
                            placeholder="Search"
                            class="mx-4"
                            outlined
                            hide-details
                            single-line
                            clearable
                            prepend-inner-icon="mdi-magnify"
                            @input="searchF"
                          />
                        </VListItemContent>
                      </VListItem>
                      <VDivider />
                    </template>
                  </VSelect>
                </VCol>
                <!-- 👉 Trailer -->
                <VCol
                  md="6"
                  cols="12"
                >
                  <VSelect
                    v-model="truckDataLocal.TrlId"
                    :items="trailer"
                    item-title="plate_number"
                    item-value="id"
                    :loading="trailerLoading"
                    label="Trailer"
                    placeholder="Select a trailer"
                    :rules="[isEmptyValidator]"
                  >
                    <template #prepend-item>
                      <VListItem>
                        <VListItemContent>
                          <VTextField
                            v-model="searchTrailer"
                            placeholder="Search"
                            class="mx-4"
                            outlined
                            hide-details
                            single-line
                            clearable
                            prepend-inner-icon="mdi-magnify"
                            @input="searchT"
                          />
                        </VListItemContent>
                      </VListItem>
                      <VDivider />
                    </template>
                  </VSelect>
                </VCol>
                <!-- 👉 Is Active -->
                <VCol
                  cols="12"
                  md="6"
                >
                  <VSelect
                    v-model="truckDataLocal.trkActive"
                    :items="[{text: 'Active', value: true}, {text: 'Inactive', value: false}]"
                    item-title="text"
                    item-value="value"
                    label="Is Active"
                    placeholder="Select a status"
                    :rules="[isEmptyValidator]"
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


