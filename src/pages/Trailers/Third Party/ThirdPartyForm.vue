<script lang="ts" setup>
import router from '@/router'
import { ref, onBeforeMount } from 'vue'
import { useStore } from 'vuex'

const store = useStore()



const trailerThirdPartyData = {
  TrlId: "",
  TrkId: "",
  trlThirdInsNo: "",
  trlThirdPolicyNo: "",
  trlThirdIssuanceDate: "",
  trlThirdValidationDate: "",
  trlThirdActive: false,
}

const trailerThirdPartyDataLocal = ref(structuredClone(trailerThirdPartyData))

const successAlert = ref(false)
const errorAlert = ref(false)

const resetForm = () => {
  trailerThirdPartyDataLocal.value = structuredClone(trailerThirdPartyData)
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
  console.log("Submitting form data:", trailerThirdPartyDataLocal.value)
  try {
    store.dispatch("createTrailerThirdParty", trailerThirdPartyDataLocal.value)
    if(!error) {
      successAlert.value = true
      resetForm()
      store.dispatch("fetchTrailerInsurances")
      setTimeout(() => {
        successAlert.value = false
      }, 5000)
    } else {
      errorAlert.value = true
    }
  } catch (err) {
    console.error("Error dispatching createtrailerInsurance action:", err)
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
          text="Insurance details saved successfully"
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
          text="Insurance details not saved successfully"
          timeout="5000"
        />
        <VCard title="Trailer Insurance Details">
          <VDivider />
          <VCardText>
            <p>
              Fill the form below to register a new Trailer Insurance.
            </p>  
          </VCardText>
          <VCardText>
            <!-- 👉 Form -->
            <VForm @submit.prevent="submitForm">
              <VContainer>
                <VRow>
                  <VCol
                    md="6"
                    cols="12"
                  >
                    <VSelect
                      v-model="trailerThirdPartyDataLocal.TrkId"
                      :items="trucks"
                      item-value="id"
                      item-title="FltId.fltFleetNo"
                      label="Truck"
                      required
                      :loading="loading"
                    />
                  </VCol>
                  <VCol
                    md="6"
                    cols="12"
                  >
                    <VSelect
                      v-model="trailerThirdPartyDataLocal.TrlId"
                      :items="trailers"
                      item-value="id"
                      item-title="plate_number"
                      label="Trailer"
                      required
                      persistent-hint="Trailer plate number"
                      :loading="loading"
                    />
                  </VCol>
                  <VCol
                    cols="12"
                    md="6"
                  >
                    <VTextField
                      v-model="trailerThirdPartyDataLocal.trlThirdInsNo"
                      label="Insurance Number"
                      required
                    />
                  </VCol>
                  <VCol
                    cols="12"
                    md="6"
                  >
                    <VTextField
                      v-model="trailerThirdPartyDataLocal.trlThirdPolicyNo"
                      label="Policy Number"
                      required
                    />
                  </VCol>
                  <VCol
                    cols="12"
                    md="6"
                  >
                    <VTextField
                      v-model="trailerThirdPartyDataLocal.trlThirdIssuanceDate"
                      label="Issuance Date"
                      required
                      type="date"
                    />
                  </VCol>
                  <VCol
                    cols="12"
                    md="6"
                  >
                    <VTextField
                      v-model="trailerThirdPartyDataLocal.trlThirdValidationDate"
                      label="Valid Date"
                      required
                      type="date"
                    />
                  </VCol>
                  <VCol
                    cols="12"
                    md="6"
                  >
                    <VTextField
                      v-model="trailerThirdPartyDataLocal.trlInsPolicyNo"
                      label="Insurance Policy Number"
                      required
                    />
                  </VCol>
                  <VCol cols="12">
                    <VSwitch
                      v-model="trailerThirdPartyDataLocal.trlThirdActive"
                      label="Active"
                    />
                  </VCol>
                </VRow>
                <VRow>
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
              </VContainer>
            </VForm>
          </VCardText>
        </VCard>
      </VCol>
    </VRow>
  </div>
</template>
