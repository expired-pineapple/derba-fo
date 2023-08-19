<script lang="ts" setup>
import { ref, onBeforeMount } from 'vue'
import { useStore } from 'vuex'

const store = useStore()

const bolo = {
  TrlId: "",
  TrkId: "",
  trlBolo_no: "",
  trlBoloissuedate: "",
  trlBoloExpireDate: "",
  trlBoloActive: false,

}

const boloLocal = ref(structuredClone(bolo))

const successAlert = ref(false)
const errorAlert = ref(false)

const resetForm = () => {
  boloLocal.value = structuredClone(bolo)
}

const trucks = ref([])
const trailers =ref([])
const loading = ref(true)

onBeforeMount(async () => {
  try {
    await store.dispatch("fetchTrucks")
    await store.dispatch("fetchTrailers")
    trucks.value = store.getters.trucks
    trailers.value = store.getters.trailers
  } catch (err) {
    console.error("Error dispatching fetch action:", err)
  }finally{
    loading.value = false
  }
})

const error = store.getters.vehicleError

const submitForm = () => {
  // Submit form data to backend
  console.log("Submitting form data:", boloLocal.value)
  try {
    store.dispatch("createTrailerBolo", boloLocal.value)
    if(!error) {
      successAlert.value = true
      resetForm()
      store.dispatch("fetchTrailerBoloes")
      setTimeout(() => {
        successAlert.value = false
      }, 5000)
    } else {
      errorAlert.value = true
    }
  } catch (err) {
    console.error("Error dispatching createbolo action:", err)
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
          text="Bolo details saved successfully"
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
          text="Bolo details not saved successfully"
          timeout="5000"
        />
        <VCard title="Trailer Details">
          <VDivider />
          <VCardText>
            <p>
              Fill the form below to register a new Bolo.
            </p>  
          </VCardText>
          <VCardText>
            <!-- 👉 Form -->
            <VForm>
              <VRow>
                <VCol
                  md="6"
                  cols="12"
                >
                  <VSelect
                    v-model="boloLocal.TrkId"
                    :items="trucks"
                    item-value="id"
                    item-title="FltId.fltFleetNo"
                    label="Truck"
                    required
                  />
                </VCol>
                <VCol
                  md="6"
                  cols="12"
                >
                  <VSelect
                    v-model="boloLocal.TrlId"
                    :items="trailers"
                    item-value="id"
                    item-title="plate_number"
                    label="Trailer"
                    required
                    persistent-hint="Trailer plate number"
                  />
                </VCol>
                <VCol
                  md="6"
                  cols="12"
                >
                  <VTextField
                    v-model="boloLocal.trlBolo_no"
                    label="Bolo Number"
                    required
                  />
                </VCol>
                <VCol
                  md="6"
                  cols="12"
                >
                  <VTextField
                    v-model="boloLocal.trlBoloissuedate"
                    label="Bolo Issued Date"
                    required
                    type="date"
                  />
                </VCol>
                <VCol
                  md="6"
                  cols="12"
                >
                  <VTextField
                    v-model="boloLocal.trlBoloExpireDate"
                    label="Bolo Expiry Date"
                    required
                    type="date"
                  />
                </VCol>
                <VCol
                  md="6"
                  cols="12"
                >
                  <VSwitch
                    v-model="boloLocal.trlBoloActive"
                    label="Bolo Active"
                    required
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
            </VForm>
          </VCardText>
        </VCard>
      </VCol>
    </VRow>
  </div>
</template>
