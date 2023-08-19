<script lang="ts" setup>
import router from '@/router'
import { ref, onBeforeMount } from 'vue'
import { useStore } from 'vuex'

const store = useStore()



const thirdPartyData = {
  FltId: "",
  TrkId: "",
  FltThirdInsNo: "",
  FltThirdPolicyNo: "",
  FltThirdIssuanceDate: "",
  FltThirdExpireDate: "",
  FltThirdActive: false,
}

const thirdPartyDataLocal = ref(structuredClone(thirdPartyData))

const successAlert = ref(false)
const errorAlert = ref(false)

const resetForm = () => {
  thirdPartyDataLocal.value = structuredClone(thirdPartyData)
}

const trucks = ref([])
const fleets =ref([])
const loading = ref(true)

onBeforeMount(async () => {
  try {
    await store.dispatch("fetchTrucks")
    await store.dispatch("fetchFleets")
    trucks.value = store.getters.trucks
    fleets.value = store.getters.fleets
  } catch (err) {
    console.error("Error dispatching fetch action:", err)
  }finally{
    loading.value = false
  }
})

const error = store.getters.vehicleError

const submitForm = () => {
  // Submit form data to backend
  console.log("Submitting form data:", thirdPartyDataLocal.value)
  try {
    store.dispatch("createFleetThirdParty", thirdPartyDataLocal.value)
    if(!error) {
      successAlert.value = true
      resetForm()
      store.dispatch("fetchFleetInsurances")
      setTimeout(() => {
        successAlert.value = false
      }, 5000)
    } else {
      errorAlert.value = true
    }
  } catch (err) {
    console.error("Error dispatching createfleetInsurance action:", err)
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
          text="Thrid Party details saved successfully"
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
          text="Thrid Party details not saved successfully"
          timeout="5000"
        />
        <VCard title="Fleet Thrid Party Details">
          <VDivider />
          <VCardText>
            <p>
              Fill the form below to register a new Fleet Insurance.
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
                      v-model="thirdPartyDataLocal.TrkId"
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
                      v-model="thirdPartyDataLocal.FltId"
                      :items="fleets"
                      item-value="id"
                      item-title="fltPlateNo"
                      label="Fleet"
                      required
                      persistent-hint="Fleet plate number"
                      :loading="loading"
                    />
                  </VCol>
                  <VCol
                    cols="12"
                    md="6"
                  >
                    <VTextField
                      v-model="thirdPartyDataLocal.FltThirdInsNo"
                      label="Insurance Number"
                      required
                    />
                  </VCol>
                  <VCol
                    cols="12"
                    md="6"
                  >
                    <VTextField
                      v-model="thirdPartyDataLocal.FltThirdPolicyNo"
                      label="Policy Number"
                      required
                    />
                  </VCol>
                  <VCol
                    cols="12"
                    md="6"
                  >
                    <VTextField
                      v-model="thirdPartyDataLocal.FltThirdIssuanceDate"
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
                      v-model="thirdPartyDataLocal.FltThirdExpireDate"
                      label="Expiry Date"
                      required
                      type="date"
                    />
                  </VCol>
                  <VCol cols="12">
                    <VSwitch
                      v-model="thirdPartyDataLocal.FltThirdActive"
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
