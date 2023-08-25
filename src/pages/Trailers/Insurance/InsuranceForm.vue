<script lang="ts" setup>
import router from '@/router'
import { ref, onBeforeMount, computed } from 'vue'
import { useStore } from 'vuex'

const store = useStore()

const trailerInsuranceData = {
  TrlId: "",
  TrkId: "",
  trlInsRegistrationNo: "",
  trlInsIssuanceDate: "",
  trlInsValidationDate: "",
  trlInsPolicyNo: "",
  trlInscActive: false,
}

const trailerInsuranceDataLocal = ref(structuredClone(trailerInsuranceData))

const successAlert = ref(false)
const errorAlert = ref(false)

const resetForm = () => {
  trailerInsuranceDataLocal.value = structuredClone(trailerInsuranceData)
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
    loading.value = false
  }finally{
    loading.value = false
  }
})


const submitForm = async() => {
  try {
    await store.dispatch("createTrailerInsurance", trailerInsuranceDataLocal.value)

    const error = computed(() => store.getters.vehicleError)
    if(!error.value) {
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
    errorAlert.value = true
  }
}

const isEmptyValidator = value => {
  if (!value) {
    return "This field is required."
  }
  
  return true
}

const hasExpired = value =>{
  const date = new Date(value)
  if(date < new Date()){
    return "Document has expired"
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
                      v-model="trailerInsuranceDataLocal.TrkId"
                      :items="trucks"
                      item-value="id"
                      item-title="FltId.fltFleetNo"
                      label="Truck"
                      :rules="[isEmptyValidator]"
                      :loading="loading"
                    />
                  </VCol>
                  <VCol
                    md="6"
                    cols="12"
                  >
                    <VSelect
                      v-model="trailerInsuranceDataLocal.TrlId"
                      :items="trailers"
                      item-value="id"
                      item-title="plate_number"
                      label="Trailer"
                      :rules="[isEmptyValidator]"
                      placeholder="Trailer plate number"
                      :loading="loading"
                    />
                  </VCol>
                  <VCol
                    cols="12"
                    md="6"
                  >
                    <VTextField
                      v-model="trailerInsuranceDataLocal.trlInsRegistrationNo"
                      label="Insurance Registration Number"
                      :rules="[isEmptyValidator]"
                    />
                  </VCol>
                  <VCol
                    cols="12"
                    md="6"
                  >
                    <VTextField
                      v-model="trailerInsuranceDataLocal.trlInsIssuanceDate"
                      label="Issuance Date"
                      :rules="[isEmptyValidator]"
                      type="date"
                    />
                  </VCol>
                  <VCol
                    cols="12"
                    md="6"
                  >
                    <VTextField
                      v-model="trailerInsuranceDataLocal.trlInsValidationDate"
                      label="Valid Date"
                      :rules="[isEmptyValidator]"
                      type="date"
                    />
                  </VCol>
                  <VCol
                    cols="12"
                    md="6"
                  >
                    <VTextField
                      v-model="trailerInsuranceDataLocal.trlInsPolicyNo"
                      label="Insurance Policy Number"
                      :rules="[isEmptyValidator]"
                    />
                  </VCol>
                  <VCol cols="12">
                    <VSelect
                      v-model="trailerInsuranceDataLocal.trlInscActive"
                      label="Insurance Active"
                      :items="[{text: 'Active', value: true}, {text: 'Inactive', value: false}]"
                      item-value="value"
                      item-title="text"
                      :rules="[isEmptyValidator]"
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
