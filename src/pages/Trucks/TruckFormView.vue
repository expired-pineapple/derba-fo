<script setup>
import router from "@/router"
import { ref, onMounted, computed } from "vue"
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
const driverLoading = ref(false)
const trailerLoading = ref(false)
const fleetLoading = ref(false)

const { fetchDrivers } = mapActions("driverModule", ["fetchDrivers"])


onMounted(async () => {
  try {
    driverLoading.value = true
    store.dispatch("fetchDrivers")
    drivers.value = store.getters.drivers
    trailerLoading.value = true
    store.dispatch("fetchTrailers")
    trailer.value = store.getters.trailers
    fleetLoading.value = true
    console.log("Fetching trailer", trailer.value)
    store.dispatch("fetchFleets")
    fleet.value = store.getters.fleets
  } catch (err) {
    console.error("Error dispatching in truck form:", err)
  } finally {
    driverLoading.value = false
    trailerLoading.value = false
    fleetLoading.value = false
  }

})

const resetForm = () => {
  truckDataLocal.value = structuredClone(truckData)
}

const submitForm = () => {
  // Submit form data to backend
  console.log("Submitting form data:", truckDataLocal.value)
  try {
    store.dispatch("createTruck", truckDataLocal.value)

    const error = computed(() => store.getters.vehicleError)

    if (error.value) {
      errorAlert.value = true
      console.error("Error dispatching createTruck action:", error)
    }else{
      successAlert.value = true
      store.dispatch("fetchTrucks")
    }
    resetForm()
  } catch (err) {
    errorAlert.value = true
    console.error("Error dispatching createTruck action:", err)
  }
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
                  />
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
                  />
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
                  />
                </VCol>
                <!-- 👉 Is Active -->
                <VCol
                  cols="12"
                  md="6"
                >
                  <VSwitch
                    v-model="truckDataLocal.trkActive"
                    label="Is Active"
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


