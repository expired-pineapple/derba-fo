<script lang="ts" setup>
import router from '@/router'
import { ref, onBeforeMount } from 'vue'
import { useStore } from 'vuex'

const store = useStore()

const insuranceData = {
  FltId: "",
  TrkId: "",
  FltInsRegistrationNo: "",
  FltInsIssuanceDate: "",
  FltInsExpireDate: "",
  FltInsPolicyNo: "",
  FltInscActive: false,
}

const insuranceDataLocal = ref(structuredClone(insuranceData))

const successAlert = ref(false)
const errorAlert = ref(false)

const resetForm = () => {
  insuranceDataLocal.value = structuredClone(insuranceData)
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

const submitForm = async() => {
  try {
    await store.dispatch("createFleetInsurance", insuranceDataLocal.value)
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
    console.error("Error dispatching action:", err)
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
        <VCard title="Fleet Insurance Details">
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
                      v-model="insuranceDataLocal.TrkId"
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
                      v-model="insuranceDataLocal.FltId"
                      :items="fleets"
                      item-value="id"
                      item-title="fltPlateNo"
                      label="Fleet plate number"
                      :rules="[isEmptyValidator]"
                      placeholder="Fleet plate number"
                      :loading="loading"
                    />
                  </VCol>
                  <VCol
                    cols="12"
                    md="6"
                  >
                    <VTextField
                      v-model="insuranceDataLocal.FltInsRegistrationNo"
                      label="Insurance Registration Number"
                      :rules="[isEmptyValidator]"
                    />
                  </VCol>
                  <VCol
                    cols="12"
                    md="6"
                  >
                    <VTextField
                      v-model="insuranceDataLocal.FltInsIssuanceDate"
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
                      v-model="insuranceDataLocal.FltInsExpireDate"
                      label="Expiry Date"
                      :rules="[isEmptyValidator, hasExpired]"
                      type="date"
                    />
                  </VCol>
                  <VCol
                    cols="12"
                    md="6"
                  >
                    <VTextField
                      v-model="insuranceDataLocal.FltInsPolicyNo"
                      label="Insurance Policy Number"
                      :rules="[isEmptyValidator]"
                    />
                  </VCol>
                  <VCol cols="12">
                    <VSelect
                      v-model="insuranceDataLocal.FltInscActive"
                      :items="[{text: 'Active', value: true}, {text: 'Inactive', value: false}]"
                      item-value="value"
                      item-title="text"
                      label="Insurance Status"
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
